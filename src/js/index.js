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
  refs.template.innerHTML = "";

  const searchQuery = refs.input.value;

  if (searchQuery === "") {
    error("Please enter the name of the country");
    return;
  }

  fetchCountries(searchQuery).then(onSuccess);
}

function onSuccess(data) {
  if (data.status === 404) {
    error("No results were found for your search! Please enter correct data!");
    return;
  }

  if (data.length >= 10 || data.length === 0) {
    refs.template.innerHTML = "";

    error("Too many matches found. Please enter a more specific query!");

    return;
  } else if (data.length === 1) {
    renderCards(data);
    return;
  } else {
    renderList(data);
  }
}

function renderList(data) {
  refs.template.innerHTML = listNamesTpl(data);
}

function renderCards(data) {
  refs.template.innerHTML = cardCountryTpl(data);
}
