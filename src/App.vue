<template>
    <header class="nav">
        <RouterLink to="/movies">Movies</RouterLink>
        <RouterLink to="/search">Search</RouterLink>
    </header>
    <main>
        <RouterView />
    </main>
</template>

<style scoped>
.nav {
    display: flex;
    gap: 20px;
    padding: 16px 20px;
    border-bottom: 1px solid var(--color-border);
}

.nav a {
    color: inherit;
    text-decoration: none;
    opacity: .7;
}

.nav a:hover,
.nav a.router-link-active {
    opacity: 1;
}
</style>