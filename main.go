package main

import (
	"log"
	"net/http"
	"os"
	"path/filepath"
	"slices"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	// List of routes that should return index.html
	routeMap := []string{
		"/",
		"/Login",
	}

	if !slices.Contains(routeMap, r.URL.Path) {
		http.NotFound(w, r)
		return
	}

	w.Header().Set("Content-Type", "text/html")

	// Load index.html from the correct location
	data, err := os.ReadFile("frontend/index.html")
	if err != nil {
		http.Error(w, "Failed to load page", http.StatusInternalServerError)
		return
	}

	w.Write(data)
}

func main() {
	mux := http.NewServeMux()

	// Serve static files (JS, CSS, imgs, etc.)
	staticDirs := []string{"auth", "graphql", "imgs", "Pages", "Utils"}

	for _, dir := range staticDirs {
		route := "/" + dir + "/"
		fs := http.StripPrefix(route, http.FileServer(http.Dir(filepath.Join("frontend", dir))))
		mux.Handle(route, fs)
	}

	mux.Handle("/main.js", http.FileServer(http.Dir("frontend")))
	mux.Handle("/style.css", http.FileServer(http.Dir("frontend")))

	mux.HandleFunc("/", Handler)

	log.Println("Server running at http://localhost:8080")
	if err := http.ListenAndServe(":8080", mux); err != nil {
		log.Fatalln(err)
	}
}
