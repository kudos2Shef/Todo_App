import React from 'react'

export default function Footer({ currMode }) {
    return (

        <footer className={`attribution ${currMode ? 'darkFooter' : 'lightFooter'}`}>
            Drag and drop to reorder list <br />
            Challenge by <a href="https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW">Frontend Mentor</a>.
            Coded by <a href="https://www.frontendmentor.io/profile/kudos2Shef">kudos2Shef</a>.
        </footer>
    )
}
