# Password Generator [React Native]

A secure and customizable password generation mobile application built with React Native.

>**Note**: Ensure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions before proceeding.

## Features
- Dynamic password length selection
- Customizable character type inclusion
  - Lowercase letters
  - Uppercase letters
  - Numbers
  - Symbols
- Instant password generation
- Copy-to-clipboard support
- Responsive design

## Step 1: Start the Metro Server
First, start **Metro**, the JavaScript bundler that ships with React Native.

```bash
# using npm
npm start
# OR using Yarn
yarn start
```

## Step 2: Start your Application
Let Metro Bundler run in its own terminal. Open a new terminal from the project root:

### For Android
```bash
# using npm
npm run android
# OR using Yarn
yarn android
```

### For iOS
```bash
# using npm
npm run ios
# OR using Yarn
yarn ios
```

If set up correctly, you should see the Password Generator app running in your emulator/simulator.

## Step 3: Using the Password Generator
1. Enter desired password length (4-12 characters)
2. Select character types:
   - ✅ Lowercase (default)
   - ☐ Uppercase
   - ☐ Numbers
   - ☐ Symbols
3. Click "Generate Password"
4. View and copy your generated password

## Dependencies
- React Native
- Formik
- Yup
- react-native-bouncy-checkbox

## Troubleshooting
- Ensure all dependencies are installed: `npm install`
- Check Metro bundler logs
- Verify emulator/simulator configuration

## Customization
Easily modify:
- Character set
- Password length constraints
- UI styles in `styles` object

## Learn More
- [React Native Website](https://reactnative.dev)
- [Getting Started Guide](https://reactnative.dev/docs/environment-setup)
- [React Native Basics](https://reactnative.dev/docs/getting-started)

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
[Insert your license here]

## Congratulations! :tada:
You're now running the Password Generator React Native App! 🔐🚀
