import './App.css';
import axios from 'axios';
import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import { mobile } from './responsive';

const Container = styled.div`
display: flex;
align-items:center;
justify-content: center;
flex-direction: column;
background-color: lightblue;
width: 100%;
height: 100vh;
`
const InnerContainer = styled.div`
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
background-color:orange;
height: 50%;
width: 70%;
border-radius: 8px;
`

const Wrapper = styled.div`
display: flex;
align-items:center;
justify-content: center;
padding: 15px;
${mobile({})}
`

const Span = styled.span`
font-size: 24px;
fonr-weight: 200;
margin: 0px 10px;
${mobile({fontSize:"14px",margin: '5px 0px'})}

`
const Select = styled.select`
padding: 5px;
border:none;
${mobile({padding: '2px',fontSize: '12px'})}
`

const Option = styled.option`

`

const TextWrapper = styled.div`
display: flex;
width: 100%;
flex-direction: column;
align-items: center;
justify-content: center;
padding: 10px;
`

const TextArea = styled.textarea`
width: 55%;
margin: 20px 0px;
padding: 15px;
font-size: 18px;
border: none;
&:focus {
    outline: none;
}
${mobile({fontSize: "14px"})}
`

const Button = styled.button`
padding: 10px;
font-size: 18px;
font-weight: 800;
border-radius: 8px;
border: none;
background-color:teal;
cursor:pointer;
&:hover {
background-color: black;
color: teal;
}
`
function App() {
    const [options, setOptions] = useState([]);
    const [to, setTo] = useState('en');
    const [from, setFrom] = useState('en');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
  
    const translate = () => {
      // curl -X POST "https://libretranslate.de/translate" -H  "accept: application/json" -H  "Content-Type: application/x-www-form-urlencoded" -d "q=hello&source=en&target=es&api_key=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
     
      const params = new URLSearchParams();
      params.append('q', input);
      params.append('source', from);
      params.append('target', to);
      params.append('api_key', 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
  
      axios.post('https://libretranslate.de/translate',params, {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }).then(res=>{
        console.log(res.data)
        setOutput(res.data.translatedText)
      })
    };
  
    useEffect(() => {
      axios
        .get('https://libretranslate.de/languages', {
          headers: { accept: 'application/json' },
        })
        .then((res) => {
          console.log(res.data);
          setOptions(res.data);
        });
    }, []);
  
    //  curl -X GET "https://libretranslate.de/languages" -H  "accept: application/json"
  return (
   <Container>
     <InnerContainer>
     <Wrapper>
        <Span>From ({from}) :</Span>
        <Select onChange={(e) => setFrom(e.target.value)}>
            {options.map((item,index) => {
                return (
                    <Option key={index} value={item.code}>{item.name}</Option>
                )
            })}
        </Select>
        <Span>To ({to}) : </Span>
        <Select onChange={(e) => setTo(e.target.value)}>
        {options.map((item,index) => {
                return (
                    <Option key={index} value={item.code}>{item.name}</Option>
                )
            })}
        </Select>
     </Wrapper>
     <TextWrapper>
        <TextArea placeholder='Write here to convert' onInput={(e) => setInput(e.target.value)} />
        <TextArea value={output} placeholder='Converted text is here' />
        <Button onClick={translate}>Translate</Button>
     </TextWrapper>
     </InnerContainer>
   </Container>
  );
}

export default App;
