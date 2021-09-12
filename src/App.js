import React,{useState, useEffect} from 'react';
import './App.css';
//import db from "./firebase";
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import {sortData,prettyPrintStat} from './util';
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";
import {
  MenuItem,
  FormControl,
  Select,
Card,
CardContent,

} from '@material-ui/core'
function App() {
  const [countries, setCountries]=useState([]);
  const [country, setInputCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo]=useState([]);
  const [tableData, setTableDate]=useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountry, setMapCountry]=useState([]);
  const [casesType, setCasesType] = useState("cases");
  

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

useEffect(()=>{

  
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          let sortedData= sortData(data);
          setTableDate(sortedData);
          setMapCountry(data);
          setCountries(countries);
      });
  };
getCountriesData();

  },[])

const onChangeCountry= async(event)=>{
  const countryCode=event.target.value;


  const url =
  countryCode === "worldwide"
    ? "https://disease.sh/v3/covid-19/all"
    : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
await fetch(url)
  .then((response) => response.json())
  .then((data) => {
    setInputCountry(countryCode);
    setCountryInfo(data);
    setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
    setMapZoom(4);
  });
};

  return (
    <div className="app">
    <div className="app__left">
    <div className="app__header">
    <h1>COVID-19 TRACKER</h1>
    <FormControl className="header__dropdown">
    <Select variant="outlined" onChange={onChangeCountry}
     value={country}>  
    <MenuItem value="worldwide">Worldwide</MenuItem>
                {countries.map((country) => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))}
     </Select>
    </FormControl>

</div>
<div className="app__stats">
<InfoBox onClick={(e) => setCasesType("cases")}
isRed
active={casesType === "cases"}
title="COVID Active Cases" 

cases={prettyPrintStat(countryInfo.todayCases)} total={prettyPrintStat(countryInfo.cases)}/>
<InfoBox title="Recovered"
onClick={(e) => setCasesType("recovered")}
active={casesType === "recovered"}
 cases={prettyPrintStat(countryInfo.todayRecovered)} total={prettyPrintStat(countryInfo.recovered)}/>
<InfoBox  onClick={(e) => setCasesType("deaths")}
isRed
active={casesType === "deaths"}
title="Deaths" cases={prettyPrintStat(countryInfo.todayDeaths)} total={prettyPrintStat(countryInfo.deaths)}/>
</div>
<Map 
casesType={casesType}
countries={mapCountry}
center={mapCenter}
zoom={mapZoom}
/>
</div>
<Card className="app__right">
<CardContent>
<div className="app__information">
<h3>Live Cases By Countries</h3>
<Table countries={tableData} />
<h3 className="app__graphTitle">Worldwide new {casesType}</h3>
<LineGraph className="app__graph" casesType={casesType}/>
</div>
</CardContent>
</Card>
    </div>
  );
}

export default App;
