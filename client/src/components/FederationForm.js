import React, {useState} from 'react'
import { Button, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';

export default function FederationForm({ federations, setFederationFilter, federationFilter }){
  const handleChange = (val) => setFederationFilter(val);
  return (
    <ToggleButtonGroup type="checkbox" value={federationFilter} onChange={handleChange}>
      {federations.map((federation) => {
        return (
          <ToggleButton id={`tbg-btn${federation}`} value={federation}>
            {federation}
          </ToggleButton>
          )
        })
      }
    </ToggleButtonGroup>
  )
}

/*
export default function FederationForm({federations}){
  return (
    <div>
      <Form>
      { federations.map(federation => {
          return (
            <Form.Check
            type="switch"
            id="custom-switch"
            label={federation}
            />
          )
          })
        }
      </Form>
    </div>
  )
}
*/
