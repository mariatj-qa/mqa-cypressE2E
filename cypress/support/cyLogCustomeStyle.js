const getHeadHTML = () => Cypress.$(window.top.document.head);

/**
 * @description Inject custom styles into the head element of the top window
 * @param {Object} options
 * @param {string} options.backgroundColor
 * @param {string} options.color
 * @returns {string}
 * @example
 * injectCustomStyles({
 *  backgroundColor: "#0000ff",
 *  color: "#ffffff",
 * });
 * // returns
 * // <style>
 * //   background-color: #0000ff;
 * //   color: #ffffff;
 * // </style>
 **/
const injectCustomStyles = ({ backgroundColor, color }) => {
    const getCyLogElement = `#unified-reporter > div > div > div.wrap > ul > li > div > div.collapsible-content.runnables-region > ul > li > div > div.collapsible-content.runnable-instruments > div > ul > li > div > div.collapsible-content.attempt-content > div > div > ul > li > div > div.collapsible-content > ul > li.command.command-name-log > div > span > div > span.command-info`;
    const getCylogElementText = `${getCyLogElement} > span.command-message > span`;

    return `{
    <style>
      ${getCyLogElement} {
       background-color: ${backgroundColor} !important;
     }
      ${getCylogElementText} {
        color: ${color} !important;
        font-weight: bold !important;
      }

    </style>
  }`;
};

const headHTML = getHeadHTML();

if (Cypress.env("cyLogStyles") === "info") {
    headHTML.append(
        injectCustomStyles({
            backgroundColor: "#ADEBB3",
            color: "#000000",
        })
    );
}

if (Cypress.env("cyLogStyles") === "danger") {
    headHTML.append(
        injectCustomStyles({
            backgroundColor: "#ff0000",
            color: "#ffffff",
        })
    );
}

if (Cypress.env("cyLogStyles") === "warning") {
    headHTML.append(
        injectCustomStyles({
            backgroundColor: "#ffff00",
            color: "#000000",
        })
    );
}