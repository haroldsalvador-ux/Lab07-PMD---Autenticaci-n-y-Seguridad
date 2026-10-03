// min 8 caracteres, 1 mayúscula, 1 dígito y 1 caracter especial ( # $ % & * @ )
export const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[#$%&*@]).{8,}$/;

export function validatePassword(password) {
    if (!PASSWORD_REGEX.test(password ?? '')) {
        const err = new Error('El password debe tener mínimo 8 caracteres, 1 mayúscula, 1 dígito y 1 caracter especial (# $ % & * @)');
        err.status = 400;
        throw err;
    }
}
