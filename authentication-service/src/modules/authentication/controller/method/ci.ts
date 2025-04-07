// import passport from 'passport';
// import { Strategy as LocalStrategy } from 'passport-local';

// passport.use(new LocalStrategy(
//   { usernameField: 'email' }, // Usamos el campo email para la autenticación
//   async (email, password, done) => {
//     try {
//       const user = await prisma.user.findUnique({
//         where: { email },
//         include: { authMethods: true },
//       });

//       if (!user) return done(null, false, { message: 'No user found with this email' });

//       // Verificar la contraseña, por ejemplo usando bcrypt
//       const isValidPassword = await bcrypt.compare(password, user.authMethods.password);

//       if (!isValidPassword) return done(null, false, { message: 'Invalid password' });

//       return done(null, user); // Autenticación exitosa
//     } catch (error) {
//       return done(error);
//     }
//   }
// ));
