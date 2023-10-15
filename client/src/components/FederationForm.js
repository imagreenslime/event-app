import React from 'react'
import { ToggleButton, ToggleButtonGroup, Button } from 'react-bootstrap';
import '../styles/federationForm.scss'

import AMPImage from '../images/amp.png'
import USAPLImage from '../images/usapl.png'
import USPAImage from '../images/uspa.png'
import WRPFImage from '../images/wrpf.png'
const fedImages = {"USPA": USPAImage, "USAPL": USAPLImage, "AMP": AMPImage, "WRPF": WRPFImage}

export default function FederationForm({ federations, setFederationFilter, federationFilter }){
  const buttonStyle = {
    backgroundColor: 'transparent',
    border: '1px solid rgba(0, 0, 0, 0)', // Make the border transparent
  };

  const handleChange = (val) => setFederationFilter(val);
  
  return (
    <div>
      <h2 className="text-center w-100">Federations</h2>
      <ToggleButtonGroup className="pb-2 d-flex justify-content-center" vertical type="checkbox" value={federationFilter} onChange={handleChange}>
        {federations.map((federation) => {
          const imageStyle = {
            opacity: federationFilter.includes(federation, 0) || federationFilter.length === 0 ? '100%' : '40%', // default highlighted => when one is clicked the rest darken
          }
          return (
            <ToggleButton className="fedButtonGroup" style={buttonStyle} key={federation} id={federation} value={federation}>
              <img className="fedImage" style={imageStyle} src={fedImages[federation]} alt={federation} />
            </ToggleButton>
            )
          })
        }
      </ToggleButtonGroup>
      <Button className="w-100" as="input" type="reset" value="Reset" onClick={() => setFederationFilter([])} />
    </div>
  
  )
}
