import {React  }from 'react'
import "../style/About.css"


const About = () => {

  return (
    <div className='aboutcontainer'>
      <header>
        <div>
        <h2>Overview</h2>
        <div>
          <p>
          Online Notepad is a free browser-based text editor that allows you to create and edit multiple plain-text files in your browser. No registration and login required. It is great for writing quick notes and printing a simple page. What makes it special is the autosave functionality which saves your draft every second. This prevents data loss in case you accidentally close the tab, or the browser window suddenly crashes. The document you're working on will be automatically restored when you visit back, even when you close and reopen your browser. There's also support for saving documents directly to your computer. Online Notepad is packed with core features that your common text editor provides, including undo, redo, copy, cut, paste, find and replace, font formatting, character map, insert date and time, emoji list, spell checker, word counter, open and save files, and print page.
          </p>
        </div>
        <hr />
        </div>
        <div>
          <h2>How does it work?</h2>
          <p>Changes are saved automatically as you work thanks to HTML5 localStorage API. It grabs a copy of the content from the text editor and saves it to your computer. With this method, your data never leaves your device. The default time interval at which draft is saved is 1000ms or 1 second. Your notes will stay in the web browser until you clear the cookies and other site data. You can try it out by typing anything in the editor and refreshing the page.</p>
        </div>
        <hr />
        <div>
          <h2>About</h2>
          <p>This web app is a free product, which can be used by any individual, company, school, government office etc. I originally made this for myself to help me remember ideas that will eventually end up on my personal blog. This simple tool that all started as a simple project has helped my productivity immensely and I hope it helps you too.</p>
        </div>
      </header>
    </div>
  )
}

export default About
