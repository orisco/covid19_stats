let date = new Date();
// date = date.getDay() + date.getDate() + date.getMonth() + date.getFullYear();

$(".header").append(`<h3>${date}</h3>`);

// countries select

selectOptions("#countries1");
selectOptions("#countries2");
selectOptions("#countries3");

function selectOptions(div) {
  $.get(`https://coronavirus-19-api.herokuapp.com/countries/`, function (
    countries
  ) {
    for (let country of countries) {
      $(div).append(
        `<option value="${country.country}">${country.country}</option>`
      );
    }
  });
}

selectedCountry("#countries1", ".firstCountry");
selectedCountry("#countries2", ".secondCountry");
selectedCountry("#countries3", ".thirdCountry");

function selectedCountry(id, div) {
  let selectedCountry;
  $(id).change(function (e) {
    selectedCountry = $(id).children("option:selected").val();
    if ($(div).text("")) {
      getInfo(div, selectedCountry);
    } else {
      $(div).text("");
      getInfo(div, selectedCountry);
    }
  });
}

function getInfo(div, country) {
  $.get(
    `https://coronavirus-19-api.herokuapp.com/countries/${country}`,
    function (information) {
      $(div).append(
        `<p><span>Today's Cases: </span>${information.todayCases}</p>`
      );
      $(div).append(`<p><span>Cases: </span>${information.cases}</p>`);
      $(div).append(
        `<p><span>Cases/Million: </span>${information.casesPerOneMillion}</p>`
      );
      $(div).append(`<p><span>Deaths: </span>${information.deaths}</p>`);
      $(div).append(
        `<p><span>Deaths/Million: </span>${information.deathsPerOneMillion}</p>`
      );
      $(div).append(
        `<p><span>Total Tests: </span>${information.totalTests}</p>`
      );
      $(div).append(
        `<p><span>Tests/Million: </span>${information.testsPerOneMillion}</p>`
      );
    }
  );
}
