import React from 'react';
import CheckboxProtonLanguage from '../../common/CheckboxLanguage';
import CheckboxProtonGender from '../../common/CheckboxGender';
import CheckboxProtonYear from '../../common/CheckboxYear';
import CheckboxProtonEnglish from '../../common/CheckboxEnglish';
import SliderProton from '../../common/SliderProton';
import './styles.css';

const FilterPanel = ({
  selectedAge,
  languages,
  genders,
  years,
  englishes,
  changeCheckedLanguage,
  changeCheckedGender,
  changeCheckedYear,
  changeCheckedEnglish,
  changeAge,
}) => ( 
  <div>
    <div className='input-group'> 
      <p className='label'>English</p>
      {englishes.map((english) => (
        <CheckboxProtonEnglish
          key={english.id}
          english={english}
          changeCheckedEnglish={changeCheckedEnglish}
        />
      ))}
    </div>
    <div className='input-group'> 
      <p className='label'>Language</p>
      {languages.map((language) => (
        <CheckboxProtonLanguage
          key={language.id}
          language={language}
          changeCheckedLanguage={changeCheckedLanguage}
        />
      ))}
    </div>
    <div className='input-group'>
      <p className='label'>Gender</p>
      {genders.map((gender) => (
        <CheckboxProtonGender
          key={gender.id}
          gender={gender}
          changeCheckedGender={changeCheckedGender}
        />
      ))}
    </div>
    <div className='input-group'>
      <p className='label'>Year</p>
      {years.map((year) => (
        <CheckboxProtonYear
          key={year.id}
          year={year}
          changeCheckedYear={changeCheckedYear}
        />
      ))}
    </div>
    <div className='input-group'>
      <b><p className='label-range'>Age Range</p></b>
      <SliderProton value={selectedAge} changeAge={changeAge} />
    </div>
  </div>
);

export default FilterPanel;
