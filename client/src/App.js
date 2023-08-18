import React, {useEffect, useState} from 'react'
import { Button, Table, InputGroup, Form, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import FederationForm from './components/FederationForm.js';

function App(){
  // HOW TO REPLACE USE STATE WITH REACT QUERY
  const [search, setSearch] = useState('')
  const [meetData, setMeetData] = useState([])
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(0)
  

  const [federationOptions, setFederationOptions] = useState([])
  const [federationFilter, setFederationFilter] = useState([])

  useEffect(() => {
    fetch(`/meets?${queryParameters.toString()}`)
      .then((response) => {
        return response.json()
      })
      .then(data => {
        setMeetData(data.info)
        setPageCount(data.pageCount)
        setFederationOptions(data.fedOptions)
        }
      )
  }, [page, federationFilter])
  
  const filters = {
    page: page - 1,
    federation: federationFilter // OR effect for categories
  };
  
  const queryParameters = new URLSearchParams();

  for (const key in filters) {
    if (Array.isArray(filters[key])) {
      filters[key].forEach(value => {
        queryParameters.append(key, value);
      });
    } else {
        queryParameters.append(key, filters[key]);
    }
  }

  console.log(queryParameters.toString())

  return (
    <Container>
      <h1 className='text-center mt-4'>Powerlifting Meets</h1>
      <FederationForm federations={federationOptions} setFederationFilter={setFederationFilter} federationFilter={federationFilter}/>
      <Button as="input" type="reset" value="Reset" onClick={() => setFederationFilter(federationOptions)} />
      <Form>
        <InputGroup className='my-3'>
          <Form.Control onChange={(e) => setSearch(e.target.value)} placeholder='filter events'></Form.Control>
        </InputGroup>
      </Form>
      <Table>
        <thead>
           <tr>
            <th>Federation</th>
            <th>Name</th>
            <th>When</th>
            <th>State</th>
            <th>Where</th>
          </tr>
        </thead>
        <tbody>
        {meetData.map((item) => (
          <tr>
            <td>{item.federation}</td>
            <td>{item.name}</td>
            <td>{item.date}</td>
            <td>{item.state}</td>
            <td>{item.address}</td>
          </tr>
        ))}
        </tbody>
      </Table>
      <button disabled={page === 1} onClick={() => setPage(page - 1)}>Last Page</button>
      <button disabled={page === pageCount} onClick={() => setPage(page + 1)}>Next Page</button>
      <button onClick={() => setPage(1)}>Reset</button>
      <select onChange={(event) => {setPage(event.target.value)}} value={page}> 
      {Array(pageCount).fill(null).map((_, index) => { 
        return <option key={index}>{index + 1}</option>
      })} 
      </select>
    </Container>
  )
}

export default App;