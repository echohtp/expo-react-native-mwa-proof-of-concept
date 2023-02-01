import { transact } from "@solana-mobile/mobile-wallet-adapter-protocol";
import * as NavigationBar from 'expo-navigation-bar';
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function App() {

  const [foundAccounts, setFoundAccounts] = useState([])
  const [authToken, setAuthToken] = useState()

  return (
    <View style={styles.container}>
      {foundAccounts.length > 0 && foundAccounts.map((a, idx) => <Text key={idx}>{a.label}</Text>)}


      {/* connect button */}
      {foundAccounts.length == 0 && 
      <TouchableOpacity
        onPress={() => {
          transact(async (mobileWallet) => {
            try{
            const authorization = await mobileWallet.authorize({
              cluster: "devnet",
              identity: { name: "My Expo App" },
            });

            console.log(authorization);
            setFoundAccounts(authorization.accounts)
            setAuthToken(authorization.auth_token)
            }catch{
              
            }
          });
        }}
        title="Connect Wallet"
        style={{
          width: 130,
          borderRadius: 4,
          backgroundColor: '#14274e',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: 40
        }}
      >
        <Text
          style={{
            color: '#fff',
            fontWeight: 'bold',
            textAlign: 'center'
          }}
        >
          Connect Wallet
        </Text>
      </TouchableOpacity>
      }


      {/* disconnect button */}
      {foundAccounts.length > 0 && 
      <TouchableOpacity
        onPress={() => {
          transact(async (mobileWallet) => {
            const authorization = await mobileWallet.deauthorize({
              auth_token: authToken
            });

            console.log(authorization);
            setFoundAccounts([])
            setAuthToken(null)
          });
        }}
        title="Disconnect"
        style={{
          width: 130,
          borderRadius: 4,
          backgroundColor: '#14274e',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: 40
        }}
      >
        <Text
          style={{
            color: '#fff',
            fontWeight: 'bold',
            textAlign: 'center'
          }}
        >
          Disconnect
        </Text>
      </TouchableOpacity>
      }


      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  heroText: {
    fontSize: 64
  }
});
