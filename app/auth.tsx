import { useAuth } from "@/lib/auth-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, TextInput, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";

export default function AuthScreen() {
    const [isSignUp, setIsSignUp] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>("")
    const router = useRouter()
    const theme = useTheme();
    const { signIn,signUp} = useAuth()

   const handleAuth = async() => {
        if(!email || !password) {
            setError("Please fill in all fields")
            return 
        }
        if(password.length < 6) {
            setError("Passwords must be at least 6 characters")
            return
        }
        setError(null)
        if(isSignUp) {
            const error = await signUp(email, password);
            if(error){
                setError(error)
                return
            }
        }
        else{
            const error = await signIn(email,password)
            if(error){
                setError(error)
                return
            }
            router.replace("/")
        }
    }

    const toggleForm = () => {
        setIsSignUp(!isSignUp);
    }

    return(
        <KeyboardAvoidingView style={styles.container}  behavior={Platform.OS === "ios" ? "padding" : "height"} >
        <View style={styles.content} >
            <Text style={styles.title}>
               { isSignUp? "Create Account" : "Welcome Back!"}
            </Text>
            <TextInput
            style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="example@gmail.com" 
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                secureTextEntry 
                placeholder="********"
                onChangeText={setPassword}
            />
            {
                error && <Text style={{color:theme.colors.error}} >{error}</Text>
                
            }
            <Button style={styles.button} onPress={handleAuth} mode="contained">{isSignUp ? "Sign Up" : "Sign In"}</Button>
            <Button mode="text" onPress={toggleForm}>{isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}</Button>
        </View>

    </KeyboardAvoidingView>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
    },
    content:{
        flex:1,
        padding:20,
        justifyContent:"center",
    },
    title:{ 
        fontSize: 24, 
        fontWeight: "bold", 
        marginBottom: 20,
        textAlign:"center"
    },
    input:{
        marginBottom: 10,
        borderWidth: 1,
        borderRadius:50,
        padding:10
    },
    button:{
        marginTop:10,
        marginBottom: 20,
    }
})





