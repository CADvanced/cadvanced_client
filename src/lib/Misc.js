export const getCharacterName = user => {
    if (!user || !user.hasOwnProperty('character') || !user.character) {
        return;
    }
    return user.character.firstName + ' ' + user.character.lastName;
};
