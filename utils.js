

// Pagination
function paginate(items, limit = 10, page = 1) {
    const totalItems = items.length;
    const totalPages = Math.ceil(totalItems / limit);

    if (page < 1) {
        page = 1;
    } else if (page > totalPages) {
        page = totalPages;
    }

    const startIndex = (page - 1) * limit;
    const endIndex = Math.min(startIndex + limit - 1, totalItems - 1);

    const paginatedItems = items.slice(startIndex, endIndex + 1);

    return {
        page,
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
  