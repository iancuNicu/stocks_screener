import { CustomTable } from '../../components/table/table';
import { TableConfigI } from '../../models/table.model';
import './queries.scss';

const tableConfig: TableConfigI = {
    size: "lg",
    variant: "light",
    withFiltersBtn: false,
    fixedColumns: [],
    columns: []
}

export const Queries = () => {

    const onScroll = (ev: any) => {
        const bottom = ev.target.scrollHeight - ev.target.scrollTop === ev.target.clientHeight;
        if(bottom){
            
        }
    }

   

    return (
        <div className="queries-container container-fluid" onScroll={onScroll}>
            
            <CustomTable tableConfig={tableConfig} data={[]} />
        </div>
    );

}