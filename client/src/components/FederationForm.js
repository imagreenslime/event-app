import React from 'react'
import { ToggleButton, ToggleButtonGroup, Button } from 'react-bootstrap';
import AMPImage from '../images/amp.png'
import USAPLImage from '../images/usapl.png'
import USPAImage from '../images/uspa.png'

const fedImages = {"USPA": USPAImage, "USAPL": USAPLImage, "AMP": AMPImage}

export default function FederationForm({ federations, setFederationFilter, federationFilter }){
  const buttonStyle = {
    width: "100%",
    backgroundColor: 'transparent',
    border: '1px solid rgba(0, 0, 0, 0)', // Make the border transparent
  };

  const handleChange = (val) => setFederationFilter(val);
  
  return (
    <div>
      <h2 className="text-center">Federations</h2>
      <ToggleButtonGroup vertical type="checkbox" value={federationFilter} onChange={handleChange}>
        {federations.map((federation) => {
          const imageStyle = {
            opacity: federationFilter.includes(federation, 0) || federationFilter.length === 0 ? '100%' : '40%', // default highlighted => when one is clicked the rest darken
            width:"75%",
            height: "auto",
          }
          return (
            <ToggleButton style={buttonStyle} key={federation} id={federation} value={federation}>
              <img style={imageStyle} src={fedImages[federation]} alt={federation} />
            </ToggleButton>
            )
          })
        }
      </ToggleButtonGroup>
      <Button style={{width: "100%"}} as="input" type="reset" value="Reset" onClick={() => setFederationFilter([])} />
    </div>
  
  )
}
