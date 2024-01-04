class About extends Page {
    helpContent() {
        return /*html*/ `
            <h1>Help</h1>
                <p>Welcome to the help page for Join, 
                    your guide to using our kanban project 
                    management tool. Here, we'll provide 
                    an overview of what Join is, how it 
                    can benefit you, and how to use it.</p>
                <h2>What is Join?</h2>
                <p>Join is a kanban-based project management tool designed and built by a group of dedicated students as part of their web development bootcamp at the Developer Akademie. <br><br>
                    Kanban, a Japanese term meaning "billboard", is a highly effective method to visualize work, limit work-in-progress, and maximize efficiency (or flow). Join leverages the 
                    principles of kanban to help users manage their tasks and projects in an intuitive, visual interface. <br><br>
                    It is important to note that Join is designed as an educational exercise and is not intended for extensive business usage. 
                    While we strive to ensure the best possible user experience, we cannot guarantee consistent availability, reliability, accuracy, 
                    or other aspects of quality regarding Join.</p>
                <h2>How to use it</h2>
                <p>Here is a step-by-step guide on how to use Join:</p>
                <ol>
                    <li><h3>Exploring the Board</h3>
                        <p>When you log in to Join, you'll find a default board. This board represents your project and contains four default lists: "To Do", "In Progress", “Await feedback” and "Done".</p></li>
                    <li><h3>Creating Contacts</h3>
                        <p>In Join, you can add contacts to collaborate on your projects. Go to the "Contacts" section, click on "New contact", and fill in the required information. Once added, these contacts can be assigned tasks and they can interact with the tasks on the board.</p></li>
                    <li><h3>Adding Cards</h3>
                        <p>Now that you've added your contacts, you can start adding cards. Cards represent individual tasks. Click the "+" button under the appropriate list to create a new card. Fill in the task details in the card, like task name, description, due date, assignees, etc..</p></li>
                    <li><h3>Moving Cards</h3>
                        <p>As the task moves from one stage to another, you can reflect that on the board by dragging and dropping the card from one list to another.</p></li>
                    <li><h3>Deleting Cards</h3>
                        <p>Deleting Cards
                            Once a task is completed, you can either move it to the "Done" list or delete it. Deleting a card will permanently remove it from the board. Please exercise caution when deleting cards, as this action is irreversible.<br><br>

                            Remember that using Join effectively requires consistent updates from you and your team to ensure the board reflects the current state of your project.<br><br>

                            Have more questions about Join? Feel free to contact us at [Your Contact Email]. We're here to help you!
                            </p></li>
                </ol>

                <h2>Enjoy using Join!</h2>


        `
    }
    privacyContent() {
        return /*html*/ `
            <h1>Privacy Policy</h1>

            <p>Diese Datenschutzerklärung klärt Nutzer über die Art, den Umfang und Zwecke der Erhebung und Verwendung
                personenbezogener Daten durch [Dein Unternehmensname] auf dieser Website ([Webseiten-URL]) auf. Die rechtlichen
                Grundlagen des Datenschutzes finden sich im Bundesdatenschutzgesetz (BDSG) und dem Telemediengesetz (TMG).</p>

            <h2>1. Verantwortliche Stelle</h2>

            <p>Verantwortliche Stelle im Sinne der Datenschutzgesetze ist:</p>

            <address>
                [Dein Name oder Unternehmensname]<br>
                [Deine Anschrift]<br>
                [Deine E-Mail-Adresse]<br>
                [Deine Telefonnummer]
            </address>

            <h2>2. Arten der verarbeiteten Daten</h2>

            <ul>
                <li><strong>Kontaktinformationen:</strong> Name, E-Mail-Adresse, Telefonnummer.</li> 
                <li><strong>Nutzungsdaten:</strong> IP-Adresse, Browser-Typ und Version, Betriebssystem.</li>
            </ul>

            <h2>3. Zwecke der Datenverarbeitung</h2>

            <p>Wir verarbeiten personenbezogene Daten nur für bestimmte Zwecke, einschließlich:</p>

            <ul>
                <li>Bereitstellung und Verbesserung unserer Dienstleistungen.</li>
                <li>Beantwortung von Anfragen und Kommunikation mit Nutzern.</li>
                <li>Sicherheit und Schutz vor betrügerischen Aktivitäten.</li>
            </ul>

            <h2>4. Weitergabe von Daten an Dritte</h2>

            <p>Wir geben personenbezogene Daten nicht ohne Zustimmung weiter, es sei denn, dies ist zur Erfüllung unserer
                vertraglichen Pflichten erforderlich oder gesetzlich vorgeschrieben.</p>

            <h2>5. Cookies</h2>

            <p>Diese Website verwendet Cookies, um die Benutzererfahrung zu verbessern. Cookies sind kleine Textdateien, die
                auf Ihrem Gerät gespeichert werden. Sie können die Verwendung von Cookies in den Einstellungen Ihres Browsers
                deaktivieren.</p>

            <h2>6. Analyse-Tools</h2>

            <p>Diese Website verwendet [z.B. Google Analytics], einen Webanalysedienst der [Google LLC] („Google“). Die Nutzung
                erfolgt auf Grundlage des Art. 6 Abs. 1 lit. f. DSGVO.</p>

            <h2>7. Datensicherheit</h2>

            <p>Wir setzen technische und organisatorische Sicherheitsmaßnahmen ein, um personenbezogene Daten gegen
                unbeabsichtigte oder unrechtmäßige Zerstörung, Verlust oder Veränderung und gegen unbefugte Offenlegung oder
                unbefugten Zugriff zu schützen.</p>

            <h2>8. Betroffenenrechte</h2>

            <p>Sie haben das Recht auf Auskunft, Berichtigung, Löschung oder Einschränkung der Verarbeitung Ihrer gespeicherten
                personenbezogenen Daten.</p>

            <h2>9. Änderungen dieser Datenschutzerklärung</h2>

            <p>Diese Datenschutzerklärung kann sich ändern. Die jeweils aktuelle Fassung ist auf unserer Website verfügbar.</p>

            <p>Für Fragen zum Datenschutz kontaktieren Sie uns bitte unter [Deine Kontaktdaten].</p>

            <!-- <h2>Subtitle</h2>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                Repellat iste facere vel harum, voluptas rerum consequatur 
                quas qui repudiandae amet nulla asperiores pariatur veniam 
                accusamus quis cumque sapiente fugiat voluptatibus.Lorem, 
                ipsum dolor sit amet consectetur adipisicing elit. 
                Assumenda expedita atque, debitis nobis unde distinctio enim 
                consequuntur, ducimus quibusdam a doloribus eaque maiores esse 
                eligendi, cupiditate nam reprehenderit asperiores sapiente.</p>
            <h2>Subtitle</h2>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                Repellat iste facere vel harum, voluptas rerum consequatur 
                quas qui repudiandae amet nulla asperiores pariatur veniam 
                accusamus quis cumque sapiente fugiat voluptatibus.Lorem, 
                ipsum dolor sit amet consectetur adipisicing elit. 
                Assumenda expedita atque, debitis nobis unde distinctio enim 
                consequuntur, ducimus quibusdam a doloribus eaque maiores esse 
                eligendi, cupiditate nam reprehenderit asperiores sapiente.</p> -->
        `
    }
    legalNoticeContent() {
        return /*html*/ `
            <h1>Legal Notice</h1>
            <h2>Imprint</h2>
            <ul>
                <li>Roman Schröder <br> Siebengebirgsweg 10 <br> 53424 Remagen</li><br>
                <li>Stefan Ryll <br> Mittelstraße 5 <br> 67547 Worms</li><br>
                <li>Dominik Hucka <br> Peteräcker 6 <br> 72581 Dettingen an der Ems</li><br>
            </ul>
            <h3>Exploring</h3>
            <p>Email: roman.schroeder@inclufilm.com</p>
            <h3>Acceptance of terms</h3>
            <p>By accessing and using Join (Product), you acknowledge and
                agree to the following terms and conditions, and any policies,
                guidelines, or amendments thereto that may be presented to you from
                time to time. We, the listed students, may update or change the terms
                and conditions from time to time without notice.</p>
            <h3>Scope and ownership of the product</h3>
            <p>Join has been developed as part of a student group project in a web development
                bootcamp at the Developer Akademie GmbH. It has an educational purpose and is
                not intended for extensive personal & business usage. As such, we cannot
                guarantee consistent availability, reliability, accuracy, or any other
                aspect of quality regarding this Product.</p>

            <p>The design of Join is owned by the Developer Akademie GmbH. Unauthorized use,
                reproduction, modification, distribution, or replication of the design is
                strictly prohibited.</p>

            <h3>Proprietary rights</h3>
            <p>Aside from the design owned by Developer Akademie GmbH, we, the listed students,
                retain all proprietary rights in Join, including any associated copyrighted
                material, trademarks, and other proprietary information.</p>

            <h3>Use of the product</h3>
            <p>Join is intended to be used for lawful purposes only, in accordance with all
                applicable laws and regulations. Any use of Join for illegal activities, or
                to harass, harm, threaten, or intimidate another person, is strictly prohibited.
                You are solely responsible for your interactions with other users of Join.</p>

            <h3>Disclaimer of warranties and limitation of liability</h3>
            <p>Join is provided "as is" without warranty of any kind, whether express or implied,
                including but not limited to the implied warranties of merchantability, fitness
                for a particular purpose, and non-infringement. In no event will we, the listed
                students, or the Developer Akademie, be liable for any direct, indirect, incidental,
                special, consequential or exemplary damages, including but not limited to, damages
                for loss of profits, goodwill, use, data, or other intangible losses, even if we
                have been advised of the possibility of such damages, arising out of or in connection
                with the use or performance of Join.</p>

            <h3>Indemnity</h3>
            <p>You agree to indemnify, defend and hold harmless us, the listed students, the Developer
                Akademie, and our affiliates, partners, officers, directors, agents, and employees,
                from and against any claim, demand, loss, damage, cost, or liability (including reasonable
                legal fees) arising out of or relating to your use of Join and/or your breach of this Legal Notice. </p>
                
            <p>For any questions or notices, please contact us at [Contact Email].</p>
                
            <p>Date: July 26, 2023</p>
        `
    }

}