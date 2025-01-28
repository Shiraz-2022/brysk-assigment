import { Contact } from "types/contact";

export const groupAndSortContacts = (contacts: Contact[]) => {
  const sortedContacts = contacts.sort((a, b) => a.name.localeCompare(b.name));
  const groupedContacts = sortedContacts.reduce(
    (acc: Record<string, Contact[]>, contact) => {
      const firstLetter = contact.name[0].toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(contact);
      return acc;
    },
    {}
  );

  return Object.keys(groupedContacts)
    .sort()
    .map((letter) => ({
      title: letter,
      data: groupedContacts[letter],
    }));
};

export const filterContacts = (
  sections: { title: string; data: Contact[] }[],
  search: string
) => {
  return sections
    .map((section) => ({
      ...section,
      data: section.data.filter((contact) =>
        contact.name.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((section) => section.data.length > 0);
};
