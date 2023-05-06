

// Pagination
function paginate(items, limit = 10, currentPage = 1) {
    const totalItems = items.length;
    const totalPages = Math.ceil(totalItems / limit);

    if (currentPage < 1) {
        currentPage = 1;
    } else if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    const startIndex = (currentPage - 1) * limit;
    const endIndex = Math.min(startIndex + limit - 1, totalItems - 1);

    const paginatedItems = items.slice(startIndex, endIndex + 1);

    return {
        currentPage,
        limit,
        totalItems,
        totalPages,
        startIndex,
        endIndex,
        items: paginatedItems,
    };
}

// Delete file







module.exports = { paginate };
  