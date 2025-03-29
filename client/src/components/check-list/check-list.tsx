
import { InputGroup, ListGroup, Row } from 'react-bootstrap';
import { CheckListConfigI, ListItemI } from '../../models/lists.model';
import './check-list.scss'

export function CheckList(config: CheckListConfigI) {

    const createListElement = (el: ListItemI, index: number) => {
        return (   
        <ListGroup.Item key={`list-item-${el.value}-${index}`}>
            <Row>
                <InputGroup.Checkbox 
                        checked={el.checked}
                        onChange={(element: any) => config.onClick({
                            checked: !el.checked,
                            value: el.value
                        })}>
                </InputGroup.Checkbox>
                <span className='checkbox-string'>
                    {el.value}
                </span>
            </Row>
        </ListGroup.Item>
        )
    }

    return (
        <ListGroup>
            {
                config.elements.map((el, index) => createListElement(el, index))
            }
        </ListGroup>
    );

}