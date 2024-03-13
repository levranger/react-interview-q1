import './App.css';
import {useCallback, useEffect, useState} from 'react';
import {MultiselectInputField} from "./components/Inputs/MultiSelectInputField";
import {InputField} from "./components/Inputs/InputField";
import {getLocations, isNameValid} from "./mock-api/apis";
import {Button} from "./components/Button";
import {Table} from "./components/Table";
import {debounce} from "./utils/debounce";

function App() {
  const [name, setName] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [nameValidationError, setNameValidationError] = useState(null);
  const [fetchingError, setFetchingError] = useState(null);
  const [countriesData, setCountriesData] = useState([]);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
      getLocations().then(data => setCountriesData(data)).catch((e) => setFetchingError(e.getMessage()));
  }, []);

  const handleSelectCountryChange = (e) => setSelectedCountry(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const addTableRecord = () => {
      if (!nameValidationError && selectedCountry && name !== '') {
          setTableData([...tableData, {name: name, country: selectedCountry}]);
          setName('');
          setSelectedCountry(null);
      }
  }
  const clearTable = () => {
      setTableData([])
  }



    const debouncedValidation = useCallback(
        debounce((name) => {
            isNameValid(name).then(data => {
                if (!data) {
                    setNameValidationError('This name is taken')
                } else {
                    setNameValidationError(null);
                }
            });
        }, 300),
        []
    );



    useEffect(() => {
        if (name) {
            debouncedValidation(name);
        }
    }, [name, debouncedValidation]);



  return (
    <div className="App">

        <InputField label='name' value={name} onChange={handleNameChange} />
        { nameValidationError && <p className="error">{nameValidationError}</p> }
        <MultiselectInputField options={countriesData} label='countries' value={selectedCountry} onChange={handleSelectCountryChange} />
        <div className="buttonContainer">
            <Button label="Clear" onClick={clearTable} />
            <Button label="Add" onClick={addTableRecord} />
        </div>
        <Table data={tableData} />
    </div>
  );
}

export default App;
