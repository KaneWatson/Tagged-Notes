import { NoteData, Tag } from "../App"
import { useNote } from "../hooks/useNote"
import NoteForm from "./NoteForm"

type NewNoteProps = {
  onSubmit: (data: NoteData, id?: string) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
  isEditing?: boolean
}

function NewNote({ onSubmit, onAddTag, availableTags, isEditing = false }: NewNoteProps) {
  const note = useNote()
  return (
    <>
      <h1 className="mb-4">{isEditing ? "Edit Note" : "New note"}</h1>
      <NoteForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags} note={note || {}} />
    </>
  )
}

export default NewNote
