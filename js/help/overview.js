'use strict'

const overview = () => {
    let text = topBit();
    text += headerBar();
    text += controlPanel();
    text += fieldsPanel();
    text += topPartsPanel();
    text += outputPanel();
    text += buildLine(`Section 3 & 4 display the Fields that have been added to the page.`);
    text += `<hr>`
    text += screenInProgress();
    return text;
}

const buildLine = input => {
    let text = `<div class="row">`;
    text += `<div class="col-md-1"></div>`;
    text += `<div class="col">${input}</div>`;
    text += `<div class="col-md-1"></div>`;
    text += `</div>`
    return text;
}

const topBit = () => {
    let text = buildLine(`Casablanca is a high-level compiler for the CASA framework.`);
    text += buildLine(`It allows for rapid development of screens by simply clicking buttons to create fields and adding a few details.`);
    text += buildLine(`For each object, Casablanca builds the relevent Nunjucks/HTML, JSON, validation and javascript files.`);
    text += `<hr>`;
    text += buildLine(`For instance:`);
    text += buildLine(`Clicking the "Address" button will create an Address field to which various details need to be added.`);
    text += buildLine(`Once this is done, clicking the "Page" button will generate the Nunjucks/HTML to create an address field in CASA.`);
    text += buildLine(`The JSON button will generate all the JSON needed for the page (including error messages).`);
    text += `<br>`
    text += buildLine(`The validators button will generate the requisite validation.`);
    text += buildLine(`And the Javascript button will create a skeleton Javascript file.`);
    text += `<br>`
    text += buildLine(`To create all the files needed for a screen, use the "EXPORT BUTTON"`);
    text += `<hr>`
    text += buildLine(`At start-up, the user is presented with the following screen, which is divided into 4 parts:`)
    text += `<div class="row"><div class="col-md-1"></div><div class="col">`
    text += `<img alt="screenshot 1" src="../images/screenshot01.png" width="1000px">`
    text += `</div></div>`
    text += `<hr>`
    return text;
}

const headerBar = () => {
    let text = buildLine('Section 1 is the header bar, about which more later.')
    text += `<div class="row"><div class="col-md-1"></div><div class="col">`
    text += `<img alt="screenshot 2" src="../images/screenshot02.png" width="1000px">`
    text += `</div></div>`
    text += `<hr>`
    return text
}

const controlPanel = () => {
    let text = buildLine('Section 2 is the control panel.')
    text += `<div class="row"><div class="col-md-1"></div>`
    text += `<div class="col">`
    text += `<img alt="screenshot 3" src="../images/screenshot03.png" width="400px">`
    text += `</div>`
    text += `<div class="col">`
    text += buildLine(`It is from here that you add fields to your page and display and text the results.`)
    text += `<hr>`

    // selection tab header
    text += buildLine(`The selection tab header.`)
    text += `<div class="row"><div class="col-md-1"></div><div class="col">`
    text += `<img alt="screenshot 4" src="../images/screenshot04.png" width="300px">`
    text += `</div></div>`
    text += `<br>`
    text += buildLine(`Here 'Page' has been selected. To switch to 'Fields' or 'Top', click the appropriate tab.`)
    text += `<hr>`

    // page panel
    text += buildLine(`Because 'Page' has been selected, Casablanca displays the Page panel.`)
    text += `<div class="row">`
    text += `  <div class="col-md-1"></div>`
    text += `  <div class="col">`
    text += `    <img alt="screenshot 5" src="../images/screenshot05.png" width="300px">`
    text += `  </div>`
    text += `</div>`
    text += buildLine('This is where you enter the details of the page you are working on.')
    text += '</div>'

    text += `</div>`;
    text += `<hr>`;
    return text;
}

const fieldsPanel = () => {
    let text = buildLine(`Clicking 'Fields' brings up the Fields panel.`);
    text += `<div class="row"><div class="col-md-1"></div><div class="col">`;
    text += `<img alt="screenshot 6" src="../images/screenshot06.png" width="300px">`;
    text += `</div></div>`;
    text += buildLine('This gives you a selection of fields to add to your page by clicking on the appropriate button.');
    text += `<hr>`;
    return text
}

const topPartsPanel = () => {
    let text = buildLine(`Clicking 'Top' brings up the Top Parts panel.`);
    text += `<div class="row"><div class="col-md-1"></div><div class="col">`;
    text += `<img alt="screenshot 7" src="../images/screenshot07.png" width="300px">`;
    text += `</div></div>`;
    text += buildLine('This shows the default lines that go at the top of each page. They can be over-ridden by adding a Top Part field in the Fields panel.');
    text += `</div>`;
    text += `</div>`;
    text += `<hr>`;
    return text;
}

const outputPanel = () => {
    let text = buildLine(`At the bottom of Section 2 we have the 'Output' panel which has options for display the pages created by Casablanca and a button to text them all to disk.`);
    text += `<div class="row"><div class="col-md-1"></div><div class="col">`;
    text += `<img alt="screenshot 8" src="../images/screenshot08.png" width="400px">`;
    text += `</div></div>`;
    text += `<hr>`
    return text;
}

const screenInProgress = () => {
    let text = buildLine(`Here's screenshot from a work in progress -`);
    text += `<div class="row"><div class="col-md-1"></div><div class="col">`;
    text += `<img alt="screenshot 11" src="../images/screenshot11.png" width="1000px">`;
    text += `</div></div>`;
    text += `<br>`;
    text += buildLine(`It's for the screen 'about-you-contact-details, with the name being constructed from the folder name and page name as displayed in the page panel.`);
    text += `<br>`;
    text += buildLine(`The screen name is displayed in Section 1, the header bar.`)
    text += `<br>`;
    text += buildLine(`Section 3 shows the fields that have been added to the screen. The arrows allow the fields to be shuffled around.`);
    text += `<br>`;
    text += buildLine(`Section 4 is displaying the input panel for the Radio Group highlighted in red in Section 3. This is where the user enters the relevent details for the field.`);
    text += `<br>`;
    text += buildLine(`To highlight another field, simply click on its button in Section 3.`);
    text += `<br>`;
    text += buildLine(`To display the input panels for all fields in Section 4, click on the 'Show All' button.`);
    return text;
}

module.exports = overview;