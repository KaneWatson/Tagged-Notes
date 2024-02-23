import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from "react-bootstrap"
import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import NewNote from "./components/NewNote"
import { useLocalStorage } from "./hooks/useLocalStorage"
import { useMemo } from "react"
import { v4 as uuidV4 } from "uuid"
import NoteList from "./components/NoteList"
import NoteLayout from "./components/NoteLayout"
import Note from "./Note"

export type Note = {
  id: string
} & NoteData

export type RawNote = {
  id: string
} & RawNoteData

export type RawNoteData = {
  title: string
  markdown: string
  tagIds: string[]
}

export type NoteData = {
  title: string
  markdown: string
  tags: Tag[]
}

export type Tag = {
  id: string
  label: string
}

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", [])
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])
  const navigate = useNavigate()

  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return { ...note, tags: tags.filter(tag => note.tagIds.includes(tag.id)) }
    })
  }, [notes, tags])

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes(notes => {
      return [...notes, { ...data, id: uuidV4(), tagIds: tags.map(tag => tag.id) }]
    })
  }

  function onUpdateNote({ tags, ...data }: NoteData, id: string | undefined) {
    setNotes(notes => {
      return notes.map(note => {
        return note.id === id ? { ...note, ...data, tagIds: tags.map(tag => tag.id) } : note
      })
    })
  }

  function onDeleteNote(id: string) {
    setNotes(notes => notes.filter(note => note.id !== id))
    navigate("/")
  }

  function addTag(tag: Tag) {
    setTags(prev => [...prev, tag])
  }

  return (
    <Container className="my-4">
      <Routes>
        <Route path="/" element={<NoteList notes={notesWithTags} availableTags={tags} />} />
        <Route path="/new" element={<NewNote onSubmit={onCreateNote} onAddTag={addTag} availableTags={tags} />} />
        <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
          <Route index element={<Note onDeleteNote={onDeleteNote} />} />
          <Route path="edit" element={<NewNote availableTags={tags} onAddTag={addTag} onSubmit={onUpdateNote} isEditing={true} />} />
        </Route>
        <Route path="/new" element={<h1>new</h1>} />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </Container>
  )
}

export default App
