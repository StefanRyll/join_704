/**
 * Die Klasse `Page` repräsentiert die Hauptseite der Anwendung.
 */
class Page {
    constructor() {
        /**
         * @type {Account[]} - Eine Liste der Benutzerkonten.
         */
        this.accounts = [];
        /**
         * Das aktuell angemeldete Benutzerkonto.
         * @type {Account|null}
         */
        this.signedAccount = null;
        /**
         * Eine Liste der Aufgaben auf der Seite.
         * @type {Task[]}
         */
        this.tasks = [];
    }

    // Methoden

    /**
     * Gibt eine Begrüßungsnachricht basierend auf der Tageszeit zurück.
     * @returns {string} - Die Begrüßungsnachricht.
     */
    sayDaytime() {
        // ...
    }

    // Components

    /**
     * Stellt das Log-In-Fenster dar.
     * @returns {string} - Das HTML des Log-In-Fensters.
     */
    logInContent() {
        // ...
    }

    /**
     * Zeigt eine Logo-Animation am Anfang an.
     * @returns {string} - Das HTML der Logo-Animation.
     */
    startAnimation() {
        // ...
    }

    /**
     * Zeigt eine Logo-Animation für den Login an.
     * @returns {string} - Das HTML der Logo-Animation für den Login.
     */
    logoLogin() {
        // ...
    }

    /**
     * Stellt das Hauptlayout der Seite dar.
     * @returns {string} - Das HTML des Hauptlayouts.
     */
    pageLayoutMain() {
        // ...
    }

    /**
     * Stellt das Layout für den Login dar.
     * @returns {string} - Das HTML des Login-Layouts.
     */
    loginLayout() {
        // ...
    }

    /**
     * Stellt den Seitenkopf und die Sidebar dar.
     * @returns {string} - Das HTML des Seitenkopfs und der Sidebar.
     */
    SideAndHead() {
        // ...
    }

    /**
     * Zeigt das Anmeldefenster für Benutzer an.
     * @returns {string} - Das HTML des Anmeldefensters.
     */
    signUpWindow() {
        // ...
    }

    /**
     * Setzt das angemeldete Benutzerkonto erzwungen.
     * @param {Account} x - Das angemeldete Benutzerkonto.
     */
    forceSignIn(x) {
        this.signedAccount = x;
    }

    /**
     * Stellt den Inhalt der Zusammenfassungsseite dar.
     * @returns {string} - Das HTML des Inhalts der Zusammenfassungsseite.
     */
    summeryContent() {
        // ...
    }

    /**
     * Überprüft, wie viele Aufgaben erledigt sind.
     * @returns {number} - Die Anzahl der erledigten Aufgaben.
     */
    checkTasksDone() {
        // ...
    }

    /**
     * Stellt den Inhalt der Hilfeseite dar.
     * @returns {string} - Das HTML des Inhalts der Hilfeseite.
     */
    helpContent() {
        // ...
    }

    /**
     * Stellt den Inhalt der Datenschutzrichtlinie dar.
     * @returns {string} - Das HTML des Inhalts der Datenschutzrichtlinie.
     */
    privacyContent() {
        // ...
    }

    /**
     * Stellt den Inhalt des Impressums dar.
     * @returns {string} - Das HTML des Inhalts des Impressums.
     */
    legalNoticeContent() {
        // ...
    }

    /**
     * Stellt den Inhalt der Aufgabenerstellungsseite dar.
     * @returns {string} - Das HTML des Inhalts der Aufgabenerstellungsseite.
     */
    addTaskContent() {
        // ...
    }
}

/**
 * Die Klasse `Account` repräsentiert ein Benutzerkonto.
 */
class Account {
    /**
     * Erzeugt ein neues Benutzerkonto.
     * @param {string} name - Der Name des Benutzers.
     * @param {string} email - Die E-Mail-Adresse des Benutzers.
     * @param {string} password - Das Passwort des Benutzers.
     */
    constructor(name, email, password) {
        /**
         * Der Name des Benutzers.
         * @type {string}
         */
        this.name = name;
        /**
         * Die E-Mail-Adresse des Benutzers.
         * @type {string}
         */
        this.email = email;
        /**
         * Das Passwort des Benutzers.
         * @type {string}
         */
        this.password = password;
        /**
         * Die Telefonnummer des Benutzers.
         * @type {string|null}
         */
        this.tel = null;
        /**
         * Eine Liste der Kontakte des Benutzers.
         * @type {Account[]}
         */
        this.contacts = [];
    }

    /**
     * Fügt eine Telefonnummer zum Benutzerkonto hinzu.
     * @param {string} x - Die Telefonnummer.
     */
    addTel(x) {
        this.tel = x;
    }

    /**
     * Fügt eine Aufgabe zum Benutzerkonto hinzu.
     * @param {Task} x - Die hinzuzufügende Aufgabe.
     */
    addTask(x) {
        this.tasks.push(x);
    }

    /**
     * Fügt einen Kontakt zum Benutzerkonto hinzu.
     * @param {Account} x - Der hinzuzufügende Kontakt.
     */
    addContact(x) {
        this.contacts.push(x);
    }
}

/**
 * Die Klasse `Task` repräsentiert eine Aufgabe.
 */
class Task {
    /**
     * Erzeugt eine neue Aufgabe.
     * @param {string} title - Der Titel der Aufgabe.
     * @param {string} worker - Der Bearbeiter der Aufgabe.
     * @param {string} desc - Die Beschreibung der Aufgabe.
     * @param {number} jahr - Das Jahr, in dem die Aufgabe fällig ist.
     * @param {number} monat - Der Monat, in dem die Aufgabe fällig ist (1-12).
     * @param {number} tag - Der Tag, an dem die Aufgabe fällig ist (1-31).
     * @param {string} prio - Die Priorität der Aufgabe.
     * @param {string} Categroy - Die Kategorie der Aufgabe.
     */
    constructor(title, worker, desc, jahr, monat, tag, prio, Categroy) {
        /**
         * Der Titel der Aufgabe.
         * @type {string}
         */
        this.title = title;
        /**
         * Der Bearbeiter der Aufgabe.
         * @type {string}
         */
        this.worker = worker;
        /**
         * Die Beschreibung der Aufgabe.
         * @type {string}
         */
        this.desc = desc;
        /**
         * Das Datum, an dem die Aufgabe fällig ist.
         * @type {Date}
         */
        this.date = new Date(jahr, monat - 1, tag);
        /**
         * Die Priorität der Aufgabe.
         * @type {string}
         */
        this.prio = prio;
        /**
         * Die Kategorie der Aufgabe.
         * @type {string}
         */
        this.Categroy = Categroy;
        /**
         * Gibt an, ob die Aufgabe erledigt ist.
         * @type {boolean}
         */
        this.done = false;
        /**
         * Eine Liste von Unteraufgaben (falls vorhanden).
         * @type {Task[]}
         */
        this.subTasks = [];
    }
}
