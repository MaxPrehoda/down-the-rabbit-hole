import React, { Component } from 'react';

//start radio 0 1
export default function StartFilters() {
      return (
        <form>
          <p>Please select your favorite Web language:</p>
          <input type="radio" id="html" name="fav_language" value="HTML"></input>
          <label >HTML</label>
          <input type="radio" id="css" name="fav_language" value="CSS"></input>
          <label >CSS</label>
          <input type="radio" id="javascript" name="fav_language" value="JavaScript"></input>
          <label >JavaScript</label>
        </form>
      );
  }