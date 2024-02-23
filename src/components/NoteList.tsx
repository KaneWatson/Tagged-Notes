import { Button, Col, Form, FormGroup, Row, Stack } from "react-bootstrap"
import { Note, Tag } from "../App"
import { Link } from "react-router-dom"
import ReactSelect from "react-select"
import { useMemo, useState } from "react"
import { NoteCard } from "./NoteCard"

type NoteListProps = {
  notes: Note[]
  availableTags: Tag[]
}

function NoteList({ notes, availableTags }: NoteListProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const [title, setTitle] = useState("")

  const filteredNotes = useMemo(() => {
    return notes.filter(note => {
      return (title === "" || note.title.toLowerCase().includes(title.toLowerCase())) && (selectedTags.length === 0 || selectedTags.every(tag => note.tags.some(noteTag => noteTag.id === tag.id)))
    })
  }, [title, selectedTags, notes])

  return (
    <>
      <Row className="mb-4 align-items-center">
        <Col>
          <h1>Notes</h1>
        </Col>
        <Col xs="auto">
          <Stack direction="horizontal" gap={2}>
            <Link to={"/new"}>
              <Button variant="primary">Create</Button>
            </Link>
            <Button variant="outline-secondary">Edit Tags</Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" value={title} onChange={e => setTitle(e.target.value)} />
            </Form.Group>
          </Col>
          <Col>
            <FormGroup controlId="tags">
              <Form.Label>Tags</Form.Label>
              <ReactSelect inputId="tags" options={availableTags.map(tag => ({ label: tag.label, value: tag.id }))} isMulti value={selectedTags.map(tag => ({ label: tag.label, value: tag.id }))} onChange={tags => setSelectedTags(tags.map(tag => ({ label: tag.label, id: tag.value })))} />
            </FormGroup>
          </Col>
        </Row>
      </Form>
      <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
        {filteredNotes.map(note => (
          <Col key={note.id}>
            <NoteCard note={note} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default NoteList
