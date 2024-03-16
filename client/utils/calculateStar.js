export const starts = (Rating) => {
    if (Rating?.length === 0) {
        return 0; // Trả về 0 nếu không có đánh giá nào
    }
    const totalStars = Rating?.reduce((acc, obj) => acc + obj.stars, 0);
    return (totalStars / Rating?.length).toFixed(1);
}