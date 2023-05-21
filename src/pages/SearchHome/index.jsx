import React, { useEffect, useState, useRef } from 'react';
import EmptyView from '../../components/common/EmptyView';
import FilterPanel from '../../components/Home/FilterPanel';
import List from '../../components/Home/List';
import SearchBar from '../../components/Home/SearchBar';
import './styles.css';
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
  firebase
} from "firebase/firestore";
import { db } from "../../firebase";



const SearchHome = () => {
  
  const [user, setUser] = useState(null);

  const isComponentMounted = useRef();

  useEffect(function () {
    isComponentMounted.current = true;
    return function () {
      isComponentMounted.current = false;
    };
  }, []);

  const getPeople = async () => {
    
    let data = [];

    const q = query(
      collection(db, "users"),
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
        data.push(user);
      });
    } catch (err) {
      console.log("afafqd");
    }
    return data;
  };

    // const data = querySnapshot.docs.map((d) => ({ 
    //   uid: d.id,
    //   displayName: d.displayName,
    //   english: d.english,
    //   language: d.language,
    //   gender: d.gender,
    //   year: d.year,
    //   age: d.age,
    //   photoURL: d.photoURL,
    // }));

  // let dataList = [];
  // if(isComponentMounted.current) {
  //   dataList = getPeople();
  // }
  //const dataList = [];

  const [selectedAge, setSelectedAge] = useState( [16, 80]);

  const [englishes, setEnglishes] = useState([
    { id: 1, checked: false, label: 'Yes' },
    { id: 2, checked: false, label: 'No' },
  ]);

  const [genders, setGenders] = useState([
    { id: 1, checked: false, label: 'Male' },
    { id: 2, checked: false, label: 'Female' },
    { id: 3, checked: false, label: 'Other' },
  ]);

  const [languages, setLanguages] = useState([
    { id: 1, checked: false, label: 'Spanish' },
    { id: 2, checked: false, label: 'Chinese' },
    { id: 3, checked: false, label: 'Malayalam' },
    { id: 4, checked: false, label: 'Hindi' },
    { id: 5, checked: false, label: 'Serbian' },
  ]);

  const [years, setYears] = useState([
    { id: 1, checked: false, label: 'Freshman' },
    { id: 2, checked: false, label: 'Sophomore' },
    { id: 3, checked: false, label: 'Junior' },
    { id: 4, checked: false, label: 'Senior' },
    { id: 5, checked: false, label: 'Graduate' },
  ]);

  const [list, setList] = useState(getPeople());
  const [resultsFound, setResultsFound] = useState(true);
  const [searchInput, setSearchInput] = useState('');

  const handleChangeCheckedEnglish = (id) => {
    const englishesStateList = englishes;
    const changeCheckedEnglish = englishesStateList.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setEnglishes(changeCheckedEnglish);
  };

  const handleChangeCheckedLanguage = (id) => {
    const languagesStateList = languages;
    const changeCheckedLanguage = languagesStateList.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setLanguages(changeCheckedLanguage);
  };

  const handleChangeCheckedGender = (id) => {
    const gendersStateList = genders;
    const changeCheckedGender = gendersStateList.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setGenders(changeCheckedGender);
  };

  const handleChangeCheckedYear = (id) => {
    const yearsStateList = years;
    const changeCheckedYear = yearsStateList.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setYears(changeCheckedYear);
  };

  const handleChangeAge = (event, value) => {
    setSelectedAge(value);
  };

  const applyFilters = () => {
    let updatedList = getPeople;

    // English Filter
    const englishesChecked = englishes
      .filter((item) => item.checked)
      .map((item) => item.label.toLowerCase());

    if (englishesChecked.length) {
      updatedList = updatedList.filter((item) =>
        englishesChecked.includes(item.english)
      );
    }

    // Language Filter
    const languagesChecked = languages
      .filter((item) => item.checked)
      .map((item) => item.label.toLowerCase());

    if (languagesChecked.length) {
      updatedList = updatedList.filter((item) =>
        languagesChecked.includes(item.language)
      );
    }

    // Gender Filter
    const gendersChecked = genders
      .filter((item) => item.checked)
      .map((item) => item.label.toLowerCase());

    if (gendersChecked.length) {
      updatedList = updatedList.filter((item) =>
        gendersChecked.includes(item.gender)
      );
    }

    // Year Filter
    const yearsChecked = years
      .filter((item) => item.checked)
      .map((item) => item.label.toLowerCase());

    if (yearsChecked.length) {
      updatedList = updatedList.filter((item) =>
        yearsChecked.includes(item.year)
      );
    }

    // Search Filter
    if (searchInput) {
      updatedList = updatedList.filter(
        (item) =>
          item.displayName.toLowerCase().search(searchInput.toLowerCase().trim()) !==
          -1
      );
    }

    // Price Filter
    const minAge = selectedAge[0];
    const maxAge = selectedAge[1];

    updatedList = updatedList.filter(
      (item) => item.age >= minAge && item.age <= maxAge
    );

    setList(updatedList);

    !updatedList.length ? setResultsFound(false) : setResultsFound(true);
  };

  useEffect(() => {
    applyFilters();
  }, [languages, genders, years, englishes, searchInput, selectedAge]); //ADD HERE

  return (
    <div className='home'>
      {/* Search Bar */}
      <SearchBar
        value={searchInput}
        changeInput={(e) => setSearchInput(e.target.value)}
      />
      <div className='home_panelList-wrap'>
        {/* Filter Panel */}
        <div className='home_panel-wrap'>
          <FilterPanel
            selectedAge={selectedAge}
            englishes={englishes}
            changeCheckedEnglish={handleChangeCheckedEnglish}
            languages={languages}
            changeCheckedLanguage={handleChangeCheckedLanguage}
            genders={genders}
            changeCheckedGender={handleChangeCheckedGender}
            years={years}
            changeCheckedYear={handleChangeCheckedYear}
            changeAge={handleChangeAge}
          />
        </div>
        {/* List & Empty View */}
        <div className='home_list-wrap'>
          {resultsFound ? <List list={list} /> : <EmptyView />}
        </div>
      </div>
    </div>
  );
};

export default SearchHome;
