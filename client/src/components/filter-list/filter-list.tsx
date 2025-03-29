
import { Dropdown } from 'react-bootstrap';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { FilterListConfigI } from '../../models/lists.model';
import { CheckList } from '../check-list/check-list';
import './filter-list.scss';

export function FilterList(config: FilterListConfigI) {

    const { elements, onClick, hasDropdown, hasSearch } = config;

    return (
       hasDropdown ? 
        <Dropdown>
            <Dropdown.Toggle id="filter-dropdown">
                <AiOutlineUnorderedList className='table-filter-button' />
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <CheckList elements={elements} onClick={onClick}/>
            </Dropdown.Menu>
        </Dropdown> 
        : <CheckList  elements={elements} onClick={onClick}/>
    );

} 