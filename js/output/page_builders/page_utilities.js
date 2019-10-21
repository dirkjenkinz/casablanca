'use  strict'

const buildHeader = (pageName, tag, field) => {
    let header = `t("${pageName}:${tag}.label")`;

    field.replacements.forEach(replacement => {
        if (replacement[0] === `header`) {
            header += `\n| replace("${replacement[1]}", ${replacement[2]})`;
        };
    });

    header += `,\n`;
    return header;
};

const buildOptions = (pageName, tag, field, maxlength = 0, inline = false, trim = false) => {
    let options = "";

    if (field["text-hint"] || maxlength || field.target || trim) {
        options = `options = {\n`;

        if (field["text-hint"]) {
            options += `hint: t("${pageName}:${tag}.hint")`;

            field.replacements.forEach(replacement => {
                if (replacement[0] === `hint`) {
                    options += `\n| replace("${replacement[1]}", ${replacement[2]})`;
                };
            });

            options += `,\n`;
        };

        if (maxlength > 0) {
            options += `maxlength: ${maxlength},\n`;
        };

        if (trim) {
            options += `trim: true,\n`;
        };

        if (inline) {
            options += `inline: true,\n`;
        };

        if (field.target) {
            options += `targetPanel: "${field.target}",\n`;
        };

        options += `},\n`;
    }
    return options;
};

module.exports = { buildOptions, buildHeader };