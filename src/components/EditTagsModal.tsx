import { Button, Col, Form, Modal, Row, Stack } from "react-bootstrap"
import { Tag } from "../App"
import { useState } from "react"

type EditTagsModalProps = {
  availableTags: Tag[]
  show: boolean
  handleClose: () => void
  onDeleteTag: (id: string) => void
  onEditTag: (id: string, value: string) => void
}

type EditTagProps = {
  onDeleteTag: (id: string) => void
  tag: Tag
  onEditTag: (id: string, value: string) => void
}

function EditTagsModal({ availableTags, show, handleClose, onDeleteTag, onEditTag }: EditTagsModalProps) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit tags</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={2}>
            {availableTags.map(tag => (
              <Row key={tag.id}>
                <EditTag tag={tag} onDeleteTag={onDeleteTag} onEditTag={onEditTag} />
              </Row>
            ))}
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

function EditTag({ tag, onDeleteTag, onEditTag }: EditTagProps) {
  const [value, setValue] = useState(tag.label)
  return (
    <>
      <Col>
        <Form.Control type="text" value={value} onChange={e => setValue(e.target.value)} onBlur={() => onEditTag(tag.id, value)} />
      </Col>
      <Col xs={"auto"}>
        <Button variant="outline-danger" onClick={() => onDeleteTag(tag.id)}>
          &times;
        </Button>
      </Col>
    </>
  )
}

export default EditTagsModal
