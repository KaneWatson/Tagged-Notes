import { FormEvent, useRef, useState } from "react"
import { Button, Col, Form, FormGroup, Row, Stack } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import ReactSelectCreatable from "react-select/creatable"
import { Note, NoteData, Tag } from "../App"
import { v4 as uuidV4 } from "uuid"

type NoteFormProps = {
  onSubmit: (data: NoteData, id?: string) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
  note: Note
}

function NoteForm({ onSubmit, onAddTag, availableTags, note }: NoteFormProps) {
  const navigate = useNavigate()
  const { title, markdown, tags, id } = note
  const isEditing = Boolean(note.id)
  const titleRef = useRef<HTMLInputElement>(null)
  const markdownRef = useRef<HTMLTextAreaElement>(null)
  const [selectedTags, setSelectedTags] = useState<Tag[]>(function () {
    if (isEditing) return tags
    else return []
  })

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!titleRef.current?.value || !markdownRef.current?.value) return
    if (!isEditing)
      onSubmit({
        title: titleRef.current.value,
        markdown: markdownRef.current.value,
        tags: selectedTags
      })
    if (isEditing)
      onSubmit(
        {
          title: titleRef.current.value,
          markdown: markdownRef.current.value,
          tags: selectedTags
        },
        id
      )

    navigate(-1)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <FormGroup controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control ref={titleRef} required defaultValue={isEditing ? title : ""} />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup controlId="tags">
              <Form.Label>Tags</Form.Label>
              <ReactSelectCreatable
                options={availableTags.map(tag => ({ label: tag.label, value: tag.id }))}
                onCreateOption={label => {
                  const newTag = { id: uuidV4(), label }
                  onAddTag(newTag)
                  setSelectedTags(prev => [...prev, newTag])
                }}
                isMulti
                inputId="tags"
                value={selectedTags.map(tag => ({ label: tag.label, value: tag.id }))}
                onChange={tags => setSelectedTags(tags.map(tag => ({ label: tag.label, id: tag.value })))}
              />
            </FormGroup>
          </Col>
        </Row>

        <FormGroup controlId="markdown">
          <Form.Label>Body</Form.Label>
          <Form.Control ref={markdownRef} required as={"textarea"} rows={15} defaultValue={isEditing ? markdown : ""} />
        </FormGroup>
        <Stack direction="horizontal" gap={2} className="justify-content-end">
          <Button type="submit" variant="primary">
            Save
          </Button>

          <Button type="button" variant="outline-secondary" onClick={() => navigate(-1)}>
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Form>
  )
}

export default NoteForm
