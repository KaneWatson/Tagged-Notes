import { Badge, Button, Col, Row, Stack } from "react-bootstrap"
import { useNote } from "./hooks/useNote"
import { Link, useNavigate } from "react-router-dom"
import Markdown from "react-markdown"

type NoteProps = {
  onDeleteNote: (id: string) => void
}

function Note({ onDeleteNote }: NoteProps) {
  const { id, title, markdown, tags } = useNote()
  const navigate = useNavigate()

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>{title}</h1>
          {tags.length > 0 && (
            <Stack direction="horizontal" gap={1} className="flex-wrap">
              {tags.map(tag => (
                <Badge className="text-truncate" key={tag.id}>
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Col>
        <Col xs="auto">
          <Stack direction="horizontal" gap={2}>
            <Link to={`/${id}/edit`}>
              <Button variant="primary">Edit</Button>
            </Link>
            <Button variant="outline-danger" onClick={() => onDeleteNote(id)}>
              Delete
            </Button>
            <Button variant="outline-secondary" onClick={() => navigate("/")}>
              Back
            </Button>
          </Stack>
        </Col>
      </Row>
      <Markdown>{markdown}</Markdown>
    </>
  )
}

export default Note
