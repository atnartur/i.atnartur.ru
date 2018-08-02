const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const Handlebars = require('handlebars');
const yaml = require('js-yaml');

let partialsDir = './templates/partials';
let indexPath = './index.html';


let loadYaml = filename => yaml.safeLoad(fs.readFileSync('./data/' + filename +'.yml').toString());
module.exports.loadYaml = loadYaml;

gulp.task('template', done => {
    // fs.readdirSync(partialsDir).filter(a => a !== '..' && a !== '.').forEach(elem => {
    //     Handlebars.registerPartial(
    //         elem.replace('.handlebars', ''),
    //         fs.readFileSync(path.join(__dirname, partialsDir, elem).toString())
    //     )
    // });

    let info = loadYaml('info');
    info.year = (new Date()).getFullYear();
    info.projects = loadYaml('projects').list;

    for (let key in info.projects) {
        // console.log(info.projects[key]);
        if (typeof info.projects[key].tech === 'string')
            info.projects[key].tech_str = info.projects[key].tech;
    }

    fs.readFile(path.join(__dirname, '../templates/index.handlebars'), (err, file) => {
        let template = Handlebars.compile(file.toString());
        fs.unlink(indexPath, () => fs.writeFile(indexPath, template(info), () => done()));
    });
});
