export const hasFavorited = (ResidencyId, currentUser) => {
    const list = currentUser?.favResidenciesID || [];
    return list.includes(ResidencyId);
}

export const updateFavourites = (id, favResidenciesID) => {
    if (favResidenciesID.includes(id)) {
        return favResidenciesID.filter((resID) => resID != id)
    } else {
        return [...favResidenciesID, id]
    }
}