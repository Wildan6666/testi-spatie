<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class TranslateController extends Controller
{
    public function translate(Request $request)
    {
        $text = $request->input('text');
        $targetLang = $request->input('targetLang', 'en');

        if (!$text) {
            return response()->json(['error' => 'Teks kosong'], 400);
        }

        try {
            // Panggil LibreTranslate API
            $response = Http::post("https://libretranslate.de/translate", [
                'q' => $text,
                'source' => 'auto',
                'target' => $targetLang,
                'format' => 'text',
            ]);

            if ($response->failed()) {
                return response()->json(['error' => 'Gagal terhubung ke API'], 500);
            }

            $data = $response->json();
            return response()->json([
                'translation' => $data['translatedText'] ?? '⚠️ Tidak ada hasil terjemahan'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Terjadi kesalahan: ' . $e->getMessage()
            ], 500);
        }
    }
}
