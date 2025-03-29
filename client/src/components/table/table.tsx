import { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router';
import { ListItemI } from '../../models/lists.model';
import { ColumnConfigI, ColumnElementI, ColumnElementType, TableConfigI } from '../../models/table.model';
import { FilterList } from '../filter-list/filter-list';
import './table.scss';

export function CustomTable({tableConfig, data}:
                            {tableConfig: TableConfigI, data: {[key: string]: any}}) {

    const navigate = useNavigate();

    const [columns, setColumns] = useState(
        tableConfig.columns
    );

    const [filterList, setFilterList]: [ListItemI[], Function] = useState([]);    
    
    useEffect(() => {
        // filter out the already hardcoded columns
       // put the other data keys in column filter array
       setFilterList(
           data?.length ? Object.keys(data[0])
                   .filter(d => !tableConfig.fixedColumns
                   .find(column => column.elements[0].key === d || column.elements[1]?.key === d))
                   .map(filteredKey => ({
                       checked: !!columns.find(col => col.elements[0].key === filteredKey || col.elements[1]?.key === filteredKey),
                       value: filteredKey
                   }))                         
                 : []
       )
   }, [data]);

    const goToLink = (data: any) => {
        if(tableConfig.navigation?.url){
            const paramStr = tableConfig.navigation.parameters
                .reduce((acc, currVal, currIndex, arr) => {
                    const queryStr = `${currVal.paramName}=${data[currVal.paramName]}`; 
                    const queryParam = currIndex === 0 ? "?" + queryStr : "&" + queryStr;
                    const param = currVal.isQueryParam ? queryParam
                                                    : data[currVal.paramName]
                    return acc + param;
            }, '');
            navigate(`${tableConfig.navigation.url}/${paramStr}`);   
        }
    }                           

    const createRowCell = (elements: ColumnElementI[], data: any) => {
        return elements.length > 1 ? 
        <td key={`td-${elements[0].key}`}>
            <div key={`row-container-${elements[0].key}`} 
                className='cell-container'>
                  {
                  elements.map(element => {
                    return (
                        getRowElement(element, data)
                    )})
                }  
            </div>
        </td> : 
        <td key={`td-${elements[0].key}`}>
            {getRowElement(elements[0], data)}
        </td>
    }

    const getRowElement = (element: ColumnElementI, data: any) => {
        switch(element.type) {
            case ColumnElementType.IMAGE:
                return <Image bsPrefix='row-img'
                              className='row-img'
                              key={`image-${element.key}`}
                              src={`${data[element.key]}`} /> 
            case ColumnElementType.TEXT:
            default: 
                return (<p className='row-text' key={`row-text-${element.key}`}>
                    {data[element.key]}
                </p>)
        }
    }

    const onFilterClick = (listItem: ListItemI) => {
        const filteredEl = filterList.find(fEl => fEl.value === listItem.value);
        if(filteredEl){
            filteredEl.checked = listItem.checked;
        }
        const column = columns.find(column => column.elements[0].key === listItem.value 
                                          || column.elements[1]?.key === listItem.value);
        column ? removeColumn(listItem, column) : setNewColumn(listItem);                                  
        setFilterList([...filterList]);
    }

    const setNewColumn = (element: ListItemI) => {
        const column = ({
            description: element.value,
            elements: [
                {
                    type: ColumnElementType.TEXT,
                    key: element.value
                }
            ]
        })
        setColumns([column, ...columns]);
    }

    const removeColumn = (element: ListItemI, foundColumn: ColumnConfigI) => {
        const isInPair = foundColumn.elements.length > 1;
        if(isInPair){
            const newColumn =  {
                description: foundColumn.description,
                elements: foundColumn.elements.filter(el => el.key !== element.value)
            }
            // if is in a pair remove the specific element from the column pair
           setColumns([...columns.filter(c => !c.elements.find(el => el.key === element.value)), newColumn])
        }
        else {
            setColumns([...columns.filter(c => !c.elements.find(el => el.key === element.value))])
        }
    }

    const { fixedColumns, size, variant, withFiltersBtn } = tableConfig;

    return (
        <Table size={size && size} bsPrefix="table" 
               variant={variant && variant}
               striped
               responsive>
            <thead>
                <tr>
                    {
                        fixedColumns.map(column => 
                            <th key={`fixed-column-${column.description}`}>
                               {column.description} 
                            </th>)
                    }
                    {
                        columns.map(column => 
                        <th key={`column-${column.description}`}>
                           {column.description} 
                        </th>)
                    }
                    {withFiltersBtn && <th>
                        <FilterList hasDropdown={true} hasSearch={true}
                                    elements={[...filterList]} onClick={onFilterClick} />
                    </th>}
                </tr>
            </thead>
            <tbody>
                    {
                        data && data.map((dataEntry: any) => 
                                <tr key={`row-fixed-${dataEntry.symbol}`} onClick={() => goToLink(dataEntry)}>
                                    {
                                        fixedColumns.map((fixedColumn: any) => createRowCell(fixedColumn.elements, dataEntry))
                                    }
                                    {
                                        columns.map((column: any) => createRowCell(column.elements, dataEntry))
                                    }
                                    {withFiltersBtn && <td></td> }
                                </tr>)
                    }
            </tbody>
        </Table>
    );

}