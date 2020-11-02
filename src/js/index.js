import fetchCountries from "./fetchCountries";
import debounce from "lodash.debounce";
import listNamesTpl from "../hbs/list-countries.hbs";
import cardCountryTpl from "../hbs/one-country.hbs";
import "./pnotify.js";
import { error } from "@pnotify/core";

const refs = {
  input: document.querySelector("[data-input"),
  template: document.querySelector("[data-template]"),
};

refs.input.addEventListener("input", debounce(onInput, 500));

function onInput(e) {
  // refs.template.innerHTML = "";

  const searchQuery = refs.input.value;

  fetchCountries(searchQuery).then(onSuccess);
}

function onSuccess(data) {
  console.log(data.length);

  if (data.length >= 10) {
    refs.template.innerHTML = "";

    error("Too many matches found. Please enter a more specific query!");

    return;
  } else if (data.length === 1) {
    renderCards(data);
  } else {
    renderList(data);
  }
}

function renderList(data) {
  console.log(data);
  console.log(listNamesTpl(data));
  refs.template.innerHTML = listNamesTpl(data);
}

function renderCards(data) {
  console.log(cardCountryTpl);
  refs.template.innerHTML = cardCountryTpl(data);
}
