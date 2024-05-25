export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            // fontFamily: {},
            colors: {
                secondary: "#824D74",
                primary: "#BE7B72",
                third: "#2C839A",
                "gray-0": "#e0e0e0",
                secondaryBlack: '#1D2433',
                bgColor: '#FDAF7B'
            },
            boxShadow: {
                '3xl': '0px 0px 40px 40px rgba(29, 88, 104, 0.4)',
            },
            fontFamily: {
                inherit: 'inherit'
            }

        }
    },
    plugins: []
}
