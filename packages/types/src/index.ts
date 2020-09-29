export interface IPerson_base {
  person_id: number;
  vorname: string;
  nachname: string;
  gebDat: string;
  geschlecht: 'm' | 'W';
}

export interface IAnmeldung extends IAnmeldung_base { }

export interface IAnmeldung_base {
  anmelde_id: string;
  person: IPerson_base;
  veranstaltung: {};
  rolle: number;
}

export interface IPerson extends IPerson_base { }
