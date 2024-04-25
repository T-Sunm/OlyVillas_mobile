export const hasFavorited = (ResidencyId, currentUser) => {

    const list = currentUser?.favResidenciesID || [];
    console.log(list.includes(ResidencyId))
    return list.includes(ResidencyId);
}

export const updateFavourites = (id, favResidenciesID) => {
    console.log(favResidenciesID)
    if (favResidenciesID.includes(id)) {
        return favResidenciesID.filter((resID) => resID != id)
    } else {
        return [...favResidenciesID, id]
    }
}