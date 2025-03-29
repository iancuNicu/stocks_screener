
import { CustomButton } from "../../../components/button/button";
import { CgAddR } from 'react-icons/cg';
import { BiMessageAltAdd } from 'react-icons/bi';
import { Form, Modal } from "react-bootstrap";
import { useState } from "react";
import { StockIndustryEnum, StockSectorEnum } from "../../../models/stocks.model";

export function NewQueryModal() {

    const [modalOpen, setModalOpen] = useState(false);

    const [queryFields, setQueryFields] = useState([{key:"name", value:""}]);

    const newQuery = () => {
        
    }

    const setQueryParam = (key: string, val: number|boolean|string|StockIndustryEnum|StockSectorEnum) => {
        const 
    }

    const addQueryField = () => {
        
    }

    return (
        <>
            <CustomButton Icon={CgAddR} onClick={newQuery} 
                        className="new-query-btn" text="New Query" />
            <Modal
                autoFocus={false}
                show={modalOpen}
                scrollable={true}
                backdrop={true}>
                  <Modal.Header closeButton>
                        <Modal.Title>Create new Query</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                        <CustomButton Icon={BiMessageAltAdd} onClick={addQueryField}
                                      text="Add Field"/>
                        <Form className="new-query-form">
                           <Form.Group>
                                <Form.Label>Query Name</Form.Label>
                                <Form.Control type="text" placeholder='Enter query name' 
                                    value={queryFields[0].value}
                                    onChange={(ev) => setQueryParam(queryFields[0].key, ev.target.value)}>
                                </Form.Control>
                           </Form.Group>
                        </Form>
                  </Modal.Body>  
            </Modal> 
     </>        
    );

}