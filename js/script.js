(function(win, doc) {
  'use strict';

  let app = (function appController(){
    let $btnWhoIAm = doc.querySelector('.btn-who-i-am');
    let $btnProjects = doc.querySelector('.btn-projects');
    let $btnBack = doc.querySelectorAll('.btn-back');
    let $sectionIntro = doc.querySelector('.section-intro');
    let $sectionAbout = doc.querySelector('.section-about');
    let $sectionProjects = doc.querySelector('.section-projects');
    let $containerSectionIntro = doc.querySelector('.section-intro-container');
    let $containerSectionAbout = doc.querySelector('.section-about-container');
    let $containerSectionProjects = doc.querySelector('.section-projects-container');
    let requestForRepositories = new XMLHttpRequest();
    let $previous = null;

    return {
      init: function init() {
        this.initItyped();
        this.addEvtListeners();
        this.getRepositories();
      },
      addEvtListeners: function addEvtListeners() {
        win.addEventListener('load', this.slowlyLoad, false);
        $btnWhoIAm.addEventListener('click', this.showWhoIAm, false);
        $btnProjects.addEventListener('click', this.showProjects, false);
        Array.from($btnBack)
          .forEach(button => button.addEventListener('click', this.back, false));
      },
      initItyped: function initItyped() {
        ityped.init('#ityped', {
          strings: ['Javascript (ES5, ES6, ES7)', ' NodeJS', 'SQL/NoSQL', 'Watson APIs', 'Linux', 'Open-source', 'to learn'],
          startDelay: 1000,
          loop: true
        });
      },
      slowlyLoad: function carregamentoSuave(){
        $(doc).ready(() => {
          $("body").fadeIn(1000);
        });
      },
      showWhoIAm: function showWhoIAm() {
        $previous = $containerSectionIntro;
        $sectionIntro.replaceChild($containerSectionAbout, $containerSectionIntro);
      },
      showProjects: function showProjects() {
        $previous = $containerSectionIntro;
        $sectionIntro.replaceChild($containerSectionProjects, $containerSectionIntro);
      },
      back: function back() {
        $sectionIntro.replaceChild($previous, $sectionIntro.firstElementChild);
      },
      getRepositories: function getRepositories() {
        requestForRepositories.open('GET', 'https://api.github.com/users/lucasdutra13/repos');
        requestForRepositories.send();
        requestForRepositories.addEventListener('readystatechange', function() {
          if(requestForRepositories.status === 200 && requestForRepositories.readyState === 4) {
            const response = JSON.parse(requestForRepositories.response);
            console.log(response)
            $containerSectionProjects.appendChild(app.createGithubProjects(response));
          }
        });
      },
      createGithubProjects: function createGithubProjects(projects) {
        let $fragment = doc.createDocumentFragment();
        projects.forEach((project, index) => {
          $fragment.appendChild(this.create(project));
        });
        return $fragment;
      },
      create: function create(project) {
        let $divProject = this.generateDivProject(project['html_url'], project.name);
        $divProject.appendChild(this.generateDivDescription(project.description));
        $divProject.appendChild(this.generateDivLanguageDescription(project.language));
        return $divProject;
      },
      generateDivProject: function generateDivProject(urlTitle, title) {
        const $div = this.createElementAndAttrClass('div', 'my-project');
        $div.appendChild(this.generateDivTitle(urlTitle, title));
        return $div;
      },
      generateDivTitle: function generateDivTitle(urlTitle, title) {
        const $div = this.createElementAndAttrClass('div', 'project-title-div');
        $div.appendChild(this.generateTitle(urlTitle, title));
        return $div;
      },
      generateTitle: function generateTitle(urlTitle, title) {
        let $h1 = this.createElementAndAttrClass('h1', 'project-title');
        let $a = doc.createElement('a');
        $a.setAttribute('href', urlTitle);
        $a.setAttribute('target', '_blank');
        let $strong = doc.createElement('strong');
        $strong.textContent = this.cleanTitle(title);
        $a.appendChild($strong);
        return $h1.appendChild($a);
      },
      generateDivDescription: function generateDivDescription(description) {
        let $div = this.createElementAndAttrClass('div', 'project-description-div')
        $div.appendChild(this.generateDescription(description));
        return $div;
      },
      generateDescription: function generateDescription(description) {
        let $h2 = this.createElementAndAttrClass('h2', 'project-description');
        if(description) {
          let desc = description.replace('.  ', '.<br /> <br />');
          $h2.innerHTML = desc;
        }
        return $h2;
      },
      generateDivLanguageDescription: function generateDivLanguageDescription(language) {
        const lang = language || 'Javascript';
        const $div = this.createElementAndAttrClass('div', 'project-language-div');
        const color = this.getBgColorForLanguage(lang);
        $div.style.backgroundColor = color;
        $div.appendChild(this.generateLanguageDescription(lang));
        return $div;
      },
      generateLanguageDescription: function generateLanguageDescription(language) {
        let $languageSpan = doc.createElement('span');
        $languageSpan.textContent = language;
        return $languageSpan;
      },
      createElementAndAttrClass: function createElementAndAttrClass(elm, cls) {
        let $div = doc.createElement(elm);
        $div.classList.add(cls);
        return $div;
      },
      cleanTitle: function cleanTitle(title) {
        let withoutTrash = title.replace(/[-_]/g, ' ');
        let str = withoutTrash.split(' ').map(word => this.capitalize(word));
        return str.join(' ');
      },
      capitalize: function capitalize(word) {
        return word.slice(0, 1).toUpperCase() + word.slice(1)
      },
      getBgColorForLanguage: function getBgColorForLanguage(language) {
        let color = undefined;
        switch(language.toLowerCase()) {
          case "javascript":
            color = '#FFC312';
            return color;
          case "assembly":
            color = '#9980FA';
            return color;
          case "python":
            color = '#0652DD';
            return color;
          case "c":
            color = '#EE5A24';
            return color;
          case "css":
            color = '#B53471';
            return color;
          case "html":
            color = '#ED4C67';
            return color;
          case "c#":
            color = '#C4E538';
            return color;
          case "java":
            color = '#EA2027';
            return color;
          case "c++":
            color = '#006266';
            return color;
          case  "scilab":
            color = '#1B1464';
            return color;
          default:
            color = '#5758BB';
            return color;
        }
      },

    };

  }());
  app.init();
}(window, document));
