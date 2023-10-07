import {Pagination} from 'react-bootstrap';

export default function PageSelector({page, setPage, pageCount}){
    let numbers = [page - 2, page - 1, page, page + 1, page + 2]
    return (
        <Pagination size="sm"> 
            <Pagination.First onClick={() => setPage(1)}/>
            <Pagination.Prev disabled={page === 1} onClick={() => setPage(page - 1)} />
            {numbers.map((i) => {
                if (i === page){
                    return <Pagination.Item active onClick={() => setPage(i)}>{i} </Pagination.Item>
                }
                else if (i > 0 && i <= pageCount){
                    return <Pagination.Item onClick={() => setPage(i)}>{i} </Pagination.Item>
                }
            })
            }
            <Pagination.Next disabled={page === pageCount} onClick={() => setPage(page + 1)} />
            <Pagination.Last onClick={() => setPage(pageCount)}/>
        </Pagination>
    )
}