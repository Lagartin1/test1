import React, { useEffect } from 'react';
import { FormControl, useToast, Input } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

function SessionCard() {
    const toast = useToast();
    const [Usuario, setUser] = React.useState('');
    const [Password, setPass] = React.useState('');
    const [NuevoUsuario, setNuevoUsuario] = React.useState('');
    const [NuevaPassword, setNuevaPassword] = React.useState('');
    const [isRegistering, setIsRegistering] = React.useState(false); // Nuevo estado para el modo de registro
    const [usersMap, setUsersMap] = React.useState(
        new Map([
            ['hola', '123'],
            ['chao', '345'],
            ['colocolo', '567'],
        ])
    );
    const navigate = useNavigate();

    const handelChangeU = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser(event.target.value);
    };

    const handelChangeP = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPass(event.target.value);
    };

    const handelChangeNuevoUsuario = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNuevoUsuario(event.target.value);
    };

    const handelChangeNuevaPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNuevaPassword(event.target.value);
    };

    const handelClickLog = () => {
        const validSession = usersMap.get(Usuario) === Password;

        if (validSession) {
            sessionStorage.setItem('isLoggedIn', 'true');
            navigate('/');
            toast({
                title: 'Inicio de sesión exitoso.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } else {
            toast({
                title: 'Error: Usuario o contraseña incorrectos.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handelClickSing = () => {
        if (usersMap.has(NuevoUsuario)) {
            toast({
                title: 'Error: El usuario ya existe.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } else {
            setUsersMap((prevUsersMap) => {
                const newMap = new Map(prevUsersMap);
                newMap.set(NuevoUsuario, NuevaPassword);
                return newMap;
            });

            toast({
                title: 'Registro exitoso.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            setNuevoUsuario('');
            setNuevaPassword('');
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            isRegistering ? handelClickSing() : handelClickLog();
        }
    };

    const toggleRegisterMode = () => {
        setIsRegistering(!isRegistering);
        // Puedes restablecer los campos del formulario después de cambiar el modo
        setUser('');
        setPass('');
        setNuevoUsuario('');
        setNuevaPassword('');
    };

    useEffect(() => {
        console.log(usersMap); // Puedes realizar acciones adicionales después de la actualización del mapa aquí
    }, [usersMap]);

    return (
        <>
            <div className="logincard">
                <h1 className="loginT">¡Bienvenid@ a HateAlert!</h1>
                <FormControl isRequired>
                    <div className="wrapperLogin">
                        <div className="containerL">
                            <Input
                                id={'user'}
                                width={'20vw'}
                                value={isRegistering ? NuevoUsuario : Usuario}
                                focusBorderColor={'#fff'}
                                color={'#fff'}
                                borderWidth={'2px'}
                                borderColor='#4A5759'
                                _placeholder={{ opacity: '0.6', color: '#fff' }}
                                onChange={isRegistering ? handelChangeNuevoUsuario : handelChangeU}
                                size='md'
                                variant='outline'
                                placeholder={isRegistering ? 'Nuevo usuario...' : 'Nombre de usuario...'}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                        <div className="containerL">
                            <Input
                                id={'pass'}
                                width={'20vw'}
                                type='password'
                                value={isRegistering ? NuevaPassword : Password}
                                focusBorderColor={'#fff'}
                                color={'#fff'}
                                borderWidth={'2px'}
                                borderColor='#4A5759'
                                onChange={isRegistering ? handelChangeNuevaPassword : handelChangeP}
                                size='md'
                                variant='outline'
                                _placeholder={{ opacity: '0.6', color: '#fff' }}
                                placeholder={isRegistering ? 'Nueva contraseña...' : 'Contraseña...'}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                        <button className='logB' onClick={isRegistering ? handelClickSing : handelClickLog}>
                            {isRegistering ? 'Registrarme' : 'Iniciar sesión'}
                        </button>
                        <button className='singB' onClick={toggleRegisterMode}>
                            {isRegistering ? 'Volver a inicio de sesión' : 'Crear cuenta nueva'}
                        </button>
                    </div>
                </FormControl>
            </div>
        </>
    );
}

export default SessionCard;
