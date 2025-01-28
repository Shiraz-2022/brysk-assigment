import AsyncStorage from "@react-native-async-storage/async-storage";

// Key for storing all contacts in AsyncStorage
const CONTACTS_STORAGE_KEY = "contacts";

// Helper to fetch all contacts from AsyncStorage
export const getContacts = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(CONTACTS_STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : []; // Return empty array if no contacts
  } catch (e) {
    console.error("Failed to fetch contacts:", e);
    return [];
  }
};

// Helper to save contacts array to AsyncStorage
export const saveContacts = async (contacts: any[]) => {
  try {
    const jsonValue = JSON.stringify(contacts);
    await AsyncStorage.setItem(CONTACTS_STORAGE_KEY, jsonValue);
  } catch (e) {
    console.error("Failed to save contacts:", e);
  }
};

// Add a new contact to AsyncStorage
export const addContact = async (contact: any) => {
  try {
    const storedContacts = await AsyncStorage.getItem(CONTACTS_STORAGE_KEY);
    const contacts = storedContacts ? JSON.parse(storedContacts) : [];
    contacts.push(contact);
    await AsyncStorage.setItem(CONTACTS_STORAGE_KEY, JSON.stringify(contacts));
  } catch (error) {
    console.error("Error adding contact:", error);
  }
};

// Update an existing contact in AsyncStorage
export const updateContact = async (updatedContact: any) => {
  try {
    const storedContacts = await AsyncStorage.getItem(CONTACTS_STORAGE_KEY);
    const contacts = storedContacts ? JSON.parse(storedContacts) : [];

    const index = contacts.findIndex(
      (contact: any) => contact.id === updatedContact.id
    );
    if (index !== -1) {
      contacts[index] = updatedContact; // Update the contact
      await AsyncStorage.setItem(
        CONTACTS_STORAGE_KEY,
        JSON.stringify(contacts)
      );
    }
  } catch (error) {
    console.error("Error updating contact:", error);
  }
};

// Delete a contact by ID
export const deleteContact = async (id: string) => {
  try {
    const contacts = await getContacts(); // Fetch current contacts
    const updatedContacts = contacts.filter(
      (contact: any) => contact.id !== id
    ); // Remove contact by ID
    await saveContacts(updatedContacts); // Save updated contacts array
  } catch (e) {
    console.error("Failed to delete contact:", e);
  }
};
