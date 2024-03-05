-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 05 Mar 2024 pada 12.22
-- Versi server: 10.4.24-MariaDB
-- Versi PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `projek`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `jawaban_peserta`
--

CREATE TABLE `jawaban_peserta` (
  `id` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `id_quiz` int(11) DEFAULT NULL,
  `id_pertanyaan` int(11) DEFAULT NULL,
  `jawaban_peserta` int(11) NOT NULL,
  `skor` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `pertanyaan`
--

CREATE TABLE `pertanyaan` (
  `id` int(11) NOT NULL,
  `pertanyaan` text NOT NULL,
  `opsi_jawaban` text NOT NULL,
  `jawaban_benar` int(11) NOT NULL,
  `id_quiz` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `pertanyaan`
--

INSERT INTO `pertanyaan` (`id`, `pertanyaan`, `opsi_jawaban`, `jawaban_benar`, `id_quiz`) VALUES
(1, 'What is the capital of France?', '[\"Paris\",\"Madrid\",\"Berlin\",\"London\"]', 1, 1),
(2, 'What is the chemical formula of water?', '[\"H2O\",\"CO2\",\"NaCl\",\"C6H12O6\"]', 1, 2),
(3, 'What is 2+2?', '[\"1\",\"2\",\"3\",\"4\"]', 4, 3),
(4, 'Who wrote Hamlet?', '[\"Shakespeare\",\"Dickens\",\"Hemingway\",\"Fitzgerald\"]', 1, 4),
(5, 'What is the largest ocean?', '[\"Atlantic\",\"Indian\",\"Arctic\",\"Pacific\"]', 4, 5),
(6, 'When did the World War II end?', '[\"1945\",\"1939\",\"1944\",\"1942\"]', 1, 6),
(7, 'What is the speed of light?', '[\"299792458 m/s\",\"150000000 m/s\",\"123456789 m/s\",\"987654321 m/s\"]', 1, 7),
(8, 'Who painted the Mona Lisa?', '[\"Van Gogh\",\"Da Vinci\",\"Picasso\",\"Rembrandt\"]', 2, 8),
(9, 'What is the capital of Japan?', '[\"Seoul\",\"Beijing\",\"Tokyo\",\"Bangkok\"]', 3, 9),
(10, 'What is the largest planet in our solar system?', '[\"Earth\",\"Mars\",\"Jupiter\",\"Venus\"]', 3, 10);

-- --------------------------------------------------------

--
-- Struktur dari tabel `quiz`
--

CREATE TABLE `quiz` (
  `id` int(11) NOT NULL,
  `judul` varchar(255) NOT NULL,
  `deskripsi` text DEFAULT NULL,
  `waktu_mulai` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `waktu_selesai` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `quiz`
--

INSERT INTO `quiz` (`id`, `judul`, `deskripsi`, `waktu_mulai`, `waktu_selesai`) VALUES
(1, 'General Knowledge Quiz 1', 'A quiz about general knowledge.', '2024-03-04 03:00:27', '2024-03-04 04:00:27'),
(2, 'Science Quiz 1', 'A quiz about basic science.', '2024-03-04 03:00:27', '2024-03-04 04:00:27'),
(3, 'Math Quiz 1', 'A quiz about basic math.', '2024-03-04 03:00:27', '2024-03-04 04:00:27'),
(4, 'History Quiz 1', 'A quiz about world history.', '2024-03-04 03:00:27', '2024-03-04 04:00:27'),
(5, 'Geography Quiz 1', 'A quiz about world geography.', '2024-03-04 03:00:27', '2024-03-04 04:00:27'),
(6, 'Music Quiz 1', 'A quiz about music theory.', '2024-03-04 03:00:27', '2024-03-04 04:00:27'),
(7, 'Art Quiz 1', 'A quiz about art history.', '2024-03-04 03:00:27', '2024-03-04 04:00:27'),
(8, 'Literature Quiz 1', 'A quiz about classic literature.', '2024-03-04 03:00:27', '2024-03-04 04:00:27'),
(9, 'Physics Quiz 1', 'A quiz about physics.', '2024-03-04 03:00:27', '2024-03-04 04:00:27'),
(10, 'Chemistry Quiz 1', 'A quiz about chemistry.', '2024-03-04 03:00:27', '2024-03-04 04:00:27');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`id`, `nama`, `email`, `password`, `role`) VALUES
(1, 'Tabah Granit', 'tabah.granit@example.com', 'hashedpassword1', 'admin'),
(2, 'Tabah Granit', 'tabah.granit@example2.com', 'hashedpassword2', 'participant');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `jawaban_peserta`
--
ALTER TABLE `jawaban_peserta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_quiz` (`id_quiz`),
  ADD KEY `id_pertanyaan` (`id_pertanyaan`);

--
-- Indeks untuk tabel `pertanyaan`
--
ALTER TABLE `pertanyaan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_quiz` (`id_quiz`);

--
-- Indeks untuk tabel `quiz`
--
ALTER TABLE `quiz`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `jawaban_peserta`
--
ALTER TABLE `jawaban_peserta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `pertanyaan`
--
ALTER TABLE `pertanyaan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT untuk tabel `quiz`
--
ALTER TABLE `quiz`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `jawaban_peserta`
--
ALTER TABLE `jawaban_peserta`
  ADD CONSTRAINT `jawaban_peserta_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `jawaban_peserta_ibfk_2` FOREIGN KEY (`id_quiz`) REFERENCES `quiz` (`id`),
  ADD CONSTRAINT `jawaban_peserta_ibfk_3` FOREIGN KEY (`id_pertanyaan`) REFERENCES `pertanyaan` (`id`);

--
-- Ketidakleluasaan untuk tabel `pertanyaan`
--
ALTER TABLE `pertanyaan`
  ADD CONSTRAINT `pertanyaan_ibfk_1` FOREIGN KEY (`id_quiz`) REFERENCES `quiz` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
